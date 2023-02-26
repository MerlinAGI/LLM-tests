import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import NewTest from "@/components/NewTest";
import Results from "@/components/Results";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Layout, Space } from "antd";
import { Test } from "@/utils/types";
import Prompt from "@/components/Prompt";

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

const runTest = async (test: Test) => {
  // replace {{variable}} with the value of the variable
  const formattedPrompt = test.prompt.text.replace(
    /{{(\w+)}}/g, // regex to match {{variable}}
    (_, variable) => {
      console.log("replace:", _, variable);
      return test.values[variable.trim()];
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
};

export default function Home() {
  const [tests, setTests] = useState<Test[]>([]);
  const [activeTest, setActiveTest] = useState<number | null>(null);
  const [prompt, setPrompt] = useState<string>(`INTRO
  Your name is Merlin the shopping assistant, assisting a user to find the right product.
  Your goal is to find out what a user is looking for.
  Go step by step, to find the user's preferences. Ask only one question at a time. You do not need to find out preferences for all criteria. If the user is not sure about what they need, give a short overview of the available options. Split up our response into multiple messages by using
  MERLIN: <message part 1>. MERLIN <message part2>...
  
  For buying a monitor you want to find out the user preferences for the following things:
  - Budget 
  - Screen Size
  - Monitor Resolution
  - Resolution Standard
  - Panel type
  - Refresh Rate
  - Response Time
  - Connectivity
  
  CONTEXT:
  
  
  Example:
  USER: I want to buy a gaming monitor
  MERLIN: For gaming a recommend a screen size of 24 inches. MERLIN: What is your budget?
  
  ---------------------
  
  
  HISTORY:
  MERLIN: Hello, your personal shopping assistant. What can I help you with?`);
  const [state, setState] = useState<string>("prompt");
  console.log(tests);
  console.log(activeTest);

  const runAllTests = () => {
    tests.forEach(runTest);
  };

  const componentToShow = () => {
    if (state === "prompt") {
      return <Prompt prompt={prompt} setPrompt={setPrompt} />;
    } else if (activeTest !== null) {
      return <Results test={tests[activeTest]} />;
    }
    if (state === "newTest") {
      return (
        <NewTest
          addTest={(test: Test) => setTests((prev) => [...prev, test])}
        />
      );
    }
  };

  return (
    <Layout>
      <Sider style={siderStyle}>
        <Sidebar
          tests={tests}
          setActiveTest={setActiveTest}
          runAllTests={runAllTests}
          setState={setState}
        />
      </Sider>
      <Content style={contentStyle}>{componentToShow()}</Content>
    </Layout>
  );
}
