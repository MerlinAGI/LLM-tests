import type { Test } from "../pages/index";
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
      <p>Status: {!test.status ? "Not run" : test.status}</p>
      <p>History:</p>
      {test.history}
      <br />
      <br />
      <p>Target output:</p>
      {test.example}
      <br />
      <br />
      <p>Model output:</p>
      {test.output}
      <button onClick={() => null}>Run</button>
    </Wrapper>
  );
}
