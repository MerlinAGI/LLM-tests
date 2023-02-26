import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
// import NewTest from "@/components/NewTest";
// import Results from "@/components/Results";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Layout, Space } from "antd";
import "antd/dist/reset.css";

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

const Wrapper = styled.div`
  display: flex;
`;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#108ee9",
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#3ba0e9",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};

export interface Test {
  name: string;
  history: string;
  example: string;
  output: string | null;
  status: "passed" | "failed" | null;
}

export default function Home() {
  const [tests, setTests] = useState<Test[]>([]);
  const [activeTest, setActiveTest] = useState<number | undefined>();
  console.log(tests);
  console.log(activeTest);
  return (
    <p>Hello</p>
    // <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
    //   <Layout>
    //     <Header style={headerStyle}>Header</Header>
    //     <Content style={contentStyle}>Content</Content>
    //     <Footer style={footerStyle}>Footer</Footer>
    //   </Layout>
    // </Space>
  );
}

{
  /* <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
<Layout>
  <Header style={headerStyle}>Header</Header>
  <Content style={contentStyle}>Content</Content>
  <Footer style={footerStyle}>Footer</Footer>
</Layout>
<Layout>
  <Header style={headerStyle}>Header</Header>
  <Layout>
    <Sider style={siderStyle}>Sider</Sider>
    <Content style={contentStyle}>Content</Content>
  </Layout>
  <Footer style={footerStyle}>Footer</Footer>
</Layout>
<Layout>
  <Header style={headerStyle}>Header</Header>
  <Layout>
    <Content style={contentStyle}>Content</Content>
    <Sider style={siderStyle}>Sider</Sider>
  </Layout>
  <Footer style={footerStyle}>Footer</Footer>
</Layout>
<Layout>
  <Sider style={siderStyle}>Sider</Sider>
  <Layout>
    <Header style={headerStyle}>Header</Header>
    <Content style={contentStyle}>Content</Content>
    <Footer style={footerStyle}>Footer</Footer>
  </Layout>
</Layout>
</Space>
); */
}
