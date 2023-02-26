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

export default function Home() {
  const [tests, setTests] = useState<Test[]>([]);
  const [activeTest, setActiveTest] = useState<number | null>(null);
  console.log(tests);
  console.log(activeTest);
  return (
    <Layout>
      <Sider style={siderStyle}>
        <Sidebar tests={tests} setActiveTest={setActiveTest} />
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
