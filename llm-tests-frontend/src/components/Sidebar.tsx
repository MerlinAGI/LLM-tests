import React from "react";
import styled from "@emotion/styled";
import type { Test } from "../pages/index";
import { Layout, Button, Space, Alert } from "antd";

const { Footer, Content } = Layout;

const Bar = styled.div`
  min-height: 80vh;
  background: #fefefe;
  border: 1px solid #ddd;
  border-radius: 8px 0 0 8px;
`;

const BarHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #ddd;
  background: #eee;
`;

const Entry = styled(Alert)`
  border-radius: 0;
  padding: 12px;
  &:hover {
    cursor: pointer;
  }
`;

const contentStyle: React.CSSProperties = {
  height: "80vh",
  //   borderBottom: "1px solid #ddd",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  background: "#fefefe",
};

interface Props {
  tests: Test[];
  setActiveTest: (testIndex: number | null) => void;
  runAllTests: () => void;
  setState: (state: string) => void;
}

export default function Sidebar({
  tests,
  setActiveTest,
  runAllTests,
  setState,
}: Props) {
  return (
    <Bar>
      <Layout>
        <Content style={contentStyle}>
          <BarHeader>
            <b>Tests</b>
          </BarHeader>
          {tests.map((test, i) => (
            <Entry
              message={`#${i} ${test.name}`}
              key={test.name}
              type={
                test.judgement.status === "passed"
                  ? "success"
                  : test.judgement.status === "failed"
                  ? "error"
                  : "info"
              }
              status={test.judgement.status}
              onClick={() => setActiveTest(i)}
              showIcon
            ></Entry>
          ))}
        </Content>
        <Footer style={footerStyle}>
          <Space direction="vertical">
            <Button onClick={() => setState("prompt")}>Prompt</Button>
            <Button onClick={() => setState("newTest")}>New test</Button>
            <Button type="primary" onClick={runAllTests}>
              Run all tests
            </Button>
          </Space>
        </Footer>
      </Layout>
    </Bar>
  );
}
