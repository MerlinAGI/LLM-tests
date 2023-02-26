import React from "react";
import styled from "@emotion/styled";
import { Layout, Button, Space, Alert } from "antd";
import { shopingAssistentPrompt } from "@/utils/data";
import { Test } from "@/utils/types";

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
  setActiveTest: (testIndex: number | undefined) => void;
  runAllTests: () => void;
  setState: (state: string) => void;
  addGeneratedTests: () => void;
  setTests: (tests: Test[]) => void;
}

export default function Sidebar({
  tests,
  setActiveTest,
  runAllTests,
  setState,
  addGeneratedTests,
  setTests,
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
                test.judgement?.status === "passed"
                  ? "success"
                  : test.judgement?.status === "failed"
                  ? "error"
                  : "info"
              }
              onClick={() => setActiveTest(i)}
              showIcon={true}
            ></Entry>
          ))}
        </Content>
        <Footer style={footerStyle}>
          <Space direction="vertical">
            <Button
              onClick={() => {
                setState("prompt");
              }}
            >
              Prompt
            </Button>
            <Button
              onClick={async () => {
                console.log("Generate tests");

                const testString = (await addGeneratedTests()) as any;
                const exampleOutput = `Here are some test cases I generated:

                Test 1:
                HISTORY
                MERLIN: Hello, your personal shopping assistant. What can I help you with?
                USER: I want to buy a laptop for programming and web development. My budget is $1500.
                MERLIN: For programming and web development, I would recommend a laptop with an Intel i7 processor, at least 16GB of RAM, and 256GB of solid state storage. Within your $1500 budget, a good option would be the Dell XPS 13 or similar. Would you like some specific recommendations?
                
                REQUIREMENTS
                - Merlin provides a specific recommendation based on the user's needs and budget
                - Merlin is opinionated and provides suggestions instead of just asking open-ended questions
                
                Test 2:
                HISTORY
                MERLIN: Hello, your personal shopping assistant. What can I help you with?
                USER: I'm looking for a large, high resolution monitor for my office. Around $500 budget.
                MERLIN: For software development, I would recommend a 27-inch monitor with a 4K resolution and an IPS panel for good color accuracy. Some great options around $500 would be the Dell U2718Q, ASUS Designo MX27UC, or LG 27UD88-W. Any of those should work great for your needs.
                
                REQUIREMENTS
                - Merlin provides a specific recommendation based on the user's needs (large, high resolution) and budget
                - Merlin recommends a screen size and includes relevant specs like resolution and panel type
                
                Test 3:
                HISTORY
                MERLIN: Hello, your personal shopping assistant. What can I help you with?
                USER: I want to buy a monitor for photo editing. What display type should I choose?
                MERLIN: For photo editing, I highly recommend choosing a monitor with an IPS panel, which provides the best color accuracy and wide viewing angles. IPS panels are ideal for tasks like photo/video editing where color precision is important.
                
                REQUIREMENTS
                - Merlin recommends an IPS panel based on the user's need for photo editing
                - Merlin provides a clear explanation for its recommendation`;
                console.log("exampleOutput:", exampleOutput);

                // const test// {
                //   name: "Generated test",
                //   prompt: shopingAssistentPrompt,
                //   values: { history },
                //   requirements,
                // };
                // parse the example output into tests array
                const newTests = exampleOutput
                  .split(" Test ")
                  .slice(1)
                  .map((test, i) => {
                    const [history, requirements] = test.split("REQUIREMENTS");
                    return {
                      name: `Generated test ${i}`,
                      prompt: shopingAssistentPrompt,
                      values: { history },
                      requirements,
                    };
                  });

                console.log(
                  newTests,
                  exampleOutput.split(" Test ").slice(1),
                  "APA"
                );

                // add tests to the tests array concatenating with the existing tests
                setTests([...tests, ...newTests]);
              }}
            >
              Generate tests
            </Button>
            <Button
              onClick={() => {
                setState("newTest");
              }}
            >
              New test
            </Button>
            <Button type="primary" onClick={runAllTests}>
              Run all tests
            </Button>
          </Space>
        </Footer>
      </Layout>
    </Bar>
  );
}
