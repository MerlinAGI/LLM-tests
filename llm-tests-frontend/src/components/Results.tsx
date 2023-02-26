import { Test } from "@/utils/types";
import styled from "@emotion/styled";

interface Props {
  test: Test;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;



export default function Results({ test }: Props) {
  return (
    <Wrapper>
      <h1>Test {test.name}</h1>
      <p>Status: {!test.judgement ? "Not run" : test.judgement.status}</p>
      <p>History:</p>
      {test.values.history}
      <br />
      <br />
      <p>Requirements:</p>
      {test.requirements}
      <br />
      <br />
      <p>Completion:</p>
      {test.completion}
      <button onClick={() => null}>Run</button>
    </Wrapper>
  );
}
