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
  max-width: 500px;
`;

export default function Results({ test, runTest }: Props) {
  console.log("RESULTS", test);
  return (
    <Wrapper>
      <h1>{test.name}</h1>
      <Space direction="vertical">
        {test.judgement?.status === "passed" ? (
          <Alert message="Status: test passed" type="success" />
        ) : test.judgement?.status === "failed" ? (
          <Alert message="Status: test failed" type="error" />
        ) : (
          <Alert message="Status: not run" />
        )}
        <Card
          size="small"
          title="History"
          bordered={false}
          style={{ width: 300 }}
        >
          {test.values.history
            .split("\n")
            .slice(1)
            .map((line) => (
              <>
                {line}
                <br />
              </>
            ))}
        </Card>
        <Card
          size="small"
          title="Requirements"
          bordered={false}
          style={{ width: 300 }}
        >
          {test.requirements
            .split("\n")
            .slice(1)
            .map((line) => (
              <>
                {line}
                <br />
              </>
            ))}
        </Card>
        <Card
          size="small"
          title="Completion"
          bordered={false}
          style={{ width: 300 }}
        >
          {test.completion
            ?.split("\n")
            .slice(1)
            .map((line) => (
              <>
                {line}
                <br />
              </>
            ))}
        </Card>
        {test.judgement?.status && (
          <Card
            size="small"
            title="Feedback"
            bordered={false}
            style={{ width: 300 }}
          >
            {test.judgement.text}
          </Card>
        )}
        <Button type="primary" onClick={runTest}>
          {test.judgement?.status !== null ? "Run again" : "Run"}
        </Button>
      </Space>
    </Wrapper>
  );
}
