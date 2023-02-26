import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import NewTest from "@/components/NewTest";
import Results from "@/components/Results";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Layout, Space } from "antd";
import { Test } from "@/utils/types";

const { Header, Footer, Sider, Content } = Layout;

const inter = Inter({ subsets: ["latin"] });

// text area
const TextArea = styled.textarea`
  height: 500px;
  // reset textarea style
  outline: none;
  resize: none;
  padding: 0;
  margin: 0;
  // custom style
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border: 1px solid #eaeaea;
  min-width: 500px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  // green button
  background-color: #2ecc71;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  width: 100px;
  align-self: flex-end;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const contentStyle: React.CSSProperties = {
  padding: "16px",
};

const siderStyle: React.CSSProperties = {
  background: "#fff",
  height: "100%",
};

<<<<<<< Updated upstream
=======
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
      return test.values[variable.strip()];
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

>>>>>>> Stashed changes
export default function Home() {
  const [tests, setTests] = useState<Test[]>([]);
  const [activeTest, setActiveTest] = useState<number | undefined>();
  console.log(tests);
  console.log(activeTest);

  const runAllTests = () => {
    tests.forEach(runTest);
  }

  return (
    <Layout>
      <Sider style={siderStyle}>
        <Sidebar tests={tests} setActiveTest={setActiveTest} />
      </Sider>
      <Content style={contentStyle}>
        {activeTest !== undefined ? (
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
