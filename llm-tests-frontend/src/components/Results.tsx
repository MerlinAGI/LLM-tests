import { Test } from "@/utils/types";
import styled from "@emotion/styled";
import { Button, Alert, Card, Space } from "antd";

interface Props {
  test: Test;
  runTest: () => void;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
`;

const formatText = (text?: string) => {
  return text
    ?.split("\n")
    .slice(1)
    .map((line: string) => (
      <>
        {line}
        <br />
      </>
    ));
};

export default function Results({ test, runTest }: Props) {
  console.log("RESULTS", test);
  return (
    <Wrapper>
      <h1>{test.name}</h1>
      <Space direction="vertical">
        {test.judgement?.status === "passed" ? (
          <Alert
            message="Status: test passed : I have been a good bot 😊"
            type="success"
          />
        ) : test.judgement?.status === "failed" ? (
          <Alert
            message="Status: test failed : I have been a bad bot 😔"
            type="error"
          />
        ) : (
          <Alert message="Status: not run" />
        )}
        <Card size="small" title="History" bordered={false}>
          {formatText(test.values.history)}
        </Card>
        <Card size="small" title="Completion" bordered={false}>
          {formatText(test.completion)}
        </Card>
        <Card size="small" title="Requirements" bordered={false}>
          {formatText(test.requirements)}
        </Card>
        {test.judgement?.status && (
          <Card size="small" title="Feedback" bordered={false}>
            {formatText(test.judgement.text)}
          </Card>
        )}
        <Button type="primary" onClick={runTest}>
          {test.judgement?.status !== null ? "Run again" : "Run"}
        </Button>
      </Space>
    </Wrapper>
  );
}
