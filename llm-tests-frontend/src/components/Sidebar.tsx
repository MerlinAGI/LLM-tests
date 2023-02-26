import React from "react";
import styled from "@emotion/styled";
import type { Test } from "../pages/index";
import { Layout, Button, Space } from "antd";

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

const Entry = styled.div`
  background: #fefefe;
  border-bottom: 1px solid #ddd;
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
  setActiveTest: (testIndex: number) => void;
  runAllTests: () => void;
}

export default function Sidebar({ tests, setActiveTest, runAllTests }: Props) {
  return (
    <Bar>
      <Layout>
        <Content style={contentStyle}>
          <BarHeader>
            <b>Tests</b>
          </BarHeader>
          {tests.map((test, i) => (
            <Entry key={test.name} onClick={() => setActiveTest(i)}>
              <b>#{i}</b> {test.name}
            </Entry>
          ))}
        </Content>
        <Footer style={footerStyle}>
          <Space direction="vertical">
            <Button>New test</Button>
            <Button onClick={runAllTests}>Run all tests</Button>
          </Space>
        </Footer>
      </Layout>
    </Bar>
  );
}
