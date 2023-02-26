import { Test } from "@/utils/types";
import styled from "@emotion/styled";
import { Button, Alert, Card, Space } from "antd";

interface Props {
  test: Test;
  runTest: () => void;
  addFeedbackToPrompt: (feedback: string) => void;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
`;

<<<<<<< Updated upstream
export default function Results({ test, runTest }: Props) {
=======
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

export default function Results({ test, runTest, addFeedbackToPrompt }: Props) {
>>>>>>> Stashed changes
  console.log("RESULTS", test);
  return (
    <Wrapper>
      <h1>{test.name}</h1>
      <Space direction="vertical">
        {test.judgement?.status === "passed" ? (
          <Alert message="Status: test passed : I have been a good bot 😊" type="success" />
        ) : test.judgement?.status === "failed" ? (
          <Alert message="Status: test failed : I have been a bad bot 😔" type="error" />
        ) : (
          <Alert message="Status: not run" />
        )}
        <Card
          size="small"
          title="History"
          bordered={false}
          style={{}}
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
          title="Completion"
          bordered={false}
          style={{}}
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
        <Card
          size="small"
          title="Requirements"
          bordered={false}
          style={{}}
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
       
        {test.judgement?.status && (
          <Card
            size="small"
            title="Feedback"
            bordered={false}
            style={{}}
          >
            {test.judgement.text
            ?.split("\n")
            .slice(1)
            .map((line) => (
              <>
                {line}
                <br />
              </>
            ))}
          </Card>
        )}
        {test.judgement?.text && (
          <Button
            type="default"
            onClick={() => addFeedbackToPrompt(test.judgement.text)}
          >
            Add feedback to prompt
          </Button>
        )}
        <Button type="primary" onClick={runTest}>
          {test.judgement?.status !== null ? "Run again" : "Run"}
        </Button>
      </Space>
    </Wrapper>
  );
}
