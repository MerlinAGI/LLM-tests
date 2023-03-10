import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import NewTest from "@/components/NewTest";
import Results from "@/components/Results";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Layout, Space } from "antd";
import { Test } from "@/utils/types";
import Prompt from "@/components/Prompt";
import {
  initialTests,
  judgementPrompt,
  shopingAssistentPrompt,
} from "@/utils/data";

const { Header, Footer, Sider, Content } = Layout;

const contentStyle: React.CSSProperties = {
  padding: "16px",
  borderRadius: "0 8px 8px 0",
};

const siderStyle: React.CSSProperties = {
  background: "#fff",
  height: "100%",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};

const runTest = async (test: Test, updateTest: (newTest: Test) => void) => {
  // replace {{variable}} with the value of the variable
  const formattedPrompt = test.prompt.text.replace(
    /{{(\w+)}}/g, // regex to match {{variable}}
    (_, variable) => {
      let val = test.values[variable.trim()];
      if (variable.trim() === "history") {
        if (!val.endsWith("\nBOT:")) {
          val += "\nBOT: ";
        }
      }
      return val;
    }
  );
  // call next.js api /get_output
  const res = await fetch("/api/get_output", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: formattedPrompt,
    }),
  });

  const completion = (await res.json()).text;
  console.log("completion:", completion);
  updateTest({ ...test, completion });

  const newHistory = test.values.history + "\nBOT: " + completion;
  // judge the test
  const replaceDict = {
    history: newHistory,
    requirements: test.requirements,
  } as Record<string, string>;

  const judgementPromptFormatted = judgementPrompt.replace(
    /{{(\w+)}}/g, // regex to match {{variable}}
    (_, variable) => {
      return replaceDict[variable.trim()];
    }
  );
  console.log(
    "judgementPromptFormatted:",
    JSON.stringify(judgementPromptFormatted)
  );
  const res2 = await fetch("/api/judgement", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: judgementPromptFormatted,
    }),
  });
  const judgementText = (await res2.json()).text;
  let status = "error" as "error" | "failed" | "passed";
  if (judgementText.includes("SATISFY ALL REQUIREMENTS: NO")) {
    status = "failed";
  } else if (judgementText.includes("SATISFY ALL REQUIREMENTS: YES")) {
    status = "passed";
  }
  updateTest({
    ...test,
    completion,
    judgement: {
      status: status,
      text: judgementText,
    },
  });
};


const fixPrompt = async (test: Test, feedback: string) => {
  const improvements_start = feedback.indexOf("IMPROVEMENTS:");
  if(improvements_start === -1){
    console.error("Improvements not found in feedback");
    return prompt;
  }
  const improvements = feedback.substring(improvements_start + "IMPROVEMENTS:".length);

  const formattedPrompt = test.prompt.text.replace(
    "{{history}}",
    test.values.history
  );

  const res = await fetch("/api/fix_prompt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: test.prompt.text,
      feedback: improvements,
    }),
  });
  const newPrompt = (await res.json()).text;
  console.log("new prompt:", newPrompt);
  return newPrompt;
};

export default function Home() {
  const [tests, setTests] = useState<Test[]>(initialTests);
  const [activeTest, setActiveTest] = useState<number | undefined>();
  const [prompt, setPrompt] = useState<string>(shopingAssistentPrompt.text);
  const [newPrompt, setNewPrompt] = useState<string>(shopingAssistentPrompt.text);
  const [state, setState] = useState<string>("prompt");
  console.log(tests);
  console.log("activeTest:", activeTest);
  const addGeneratedTests = async () => {
    const res = await fetch("/api/generate_tests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: "prompt",
      }),
    });
    const generatedTests = await res.json();
    return generatedTests;
  };

  const updateTest = (idx: number) => (newTest: Test) => {
    setTests((prev) => {
      const newTests = [...prev];
      newTests[idx] = newTest;
      return newTests;
    });
  };

  const addFeedbackToPrompt = async (feedback: string) => {
    if(activeTest === undefined) return;
    const newPrompt = await fixPrompt(tests[activeTest], feedback);
    setNewPrompt(newPrompt);
  };

  const componentToShow = () => {
    console.log("state:", state);
    console.log("activeTest:", activeTest);
    if (state === "prompt") {
      return <Prompt prompt={prompt} setPrompt={setPrompt} newPrompt={newPrompt}/>;
    }
    if (state === "newTest") {
      return (
        <NewTest
          addTest={(test: Test) => setTests((prev) => [...prev, test])}
        />
      );
    }
    if (activeTest !== undefined) {
      const runTestFunc = () =>
        runTest(tests[activeTest], updateTest(activeTest));
      return (
        <Results
          test={tests[activeTest]}
          runTest={runTestFunc}
          addFeedbackToPrompt={addFeedbackToPrompt}
        />
      );
    }
  };

  const runAllTests = () => {
    tests.forEach((t, i) => runTest(t, updateTest(i)));
  };

  return (
    <Layout>
      <Sider style={siderStyle}>
        <Sidebar
          tests={tests}
          setActiveTest={(i) => {
            setState("results");
            setActiveTest(i);
          }}
          setTests={setTests}
          runAllTests={runAllTests}
          setState={setState}
          addGeneratedTests={addGeneratedTests}
        />
      </Sider>
      <Content style={contentStyle}>{componentToShow()}</Content>
    </Layout>
  );
}
