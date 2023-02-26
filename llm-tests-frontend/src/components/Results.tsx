import { Test } from "@/utils/types";
import styled from "@emotion/styled";
import { Button, Alert, Card, Space } from "antd";

interface Props {
  test: Test;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
`;

export default function Results({ test }: Props) {
  return (
    <Wrapper>
      <h1>Test {test.name}</h1>
      <Space direction="vertical">
        {test.judgement.status === "passed" ? (
          <Alert message="Test passed" type="success" />
        ) : test.judgement.status === "failed" ? (
          <Alert message="Test failed" type="error" />
        ) : (
          <Alert message="Not run" />
        )}
        <Card
          size="small"
          title="History"
          bordered={false}
          style={{ width: 300 }}
        >
          {test.values.history}
        </Card>
        <Card
          size="small"
          title="Requirements"
          bordered={false}
          style={{ width: 300 }}
        >
          {test.requirements}
        </Card>
        <Card
          size="small"
          title="Completion"
          bordered={false}
          style={{ width: 300 }}
        >
          {test.completion}
        </Card>
        <Button type="primary" onClick={() => null}>
          {test.judgement.status ? "Run again" : "Run"}
        </Button>
      </Space>
    </Wrapper>
  );
}
