import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import NewTest from "@/components/NewTest";
import Results from "@/components/Results";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Layout, Space } from "antd";
import { Test } from "@/utils/types";

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
  console.log(tests);
  console.log(activeTest);

  const runAllTests = () => {
    tests.forEach(runTest);
  }

  return (
    <Layout>
      <Sider style={siderStyle}>
        <Sidebar tests={tests} setActiveTest={setActiveTest} runAllTests={runAllTests} />
      </Sider>
      <Content style={contentStyle}>
        {activeTest !== null ? (
          <Results test={tests[activeTest]} />
        ) : (
          <NewTest
            addTest={(test: Test) => setTests((prev) => [...prev, test])}
          />
        )}
      </Content>
    </Layout>
  );
}
