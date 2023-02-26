import React from "react";
import styled from "@emotion/styled";
import type { Test } from "../pages/index";

const Bar = styled.div`
  width: 150px;
  height: 100%;
  border: 1px solid red;
  margin-right: 16px;
`;

const Entry = styled.div`
  background: #eee;
  border: 1px solid #ddd;
  padding: 8px;
`;

interface Props {
  tests: Test[];
  setActiveTest: (testIndex: number) => void;
}

export default function Sidebar({ tests, setActiveTest }: Props) {
  return (
    <div>
      <Bar>
        <b>Tests</b>
        <br />
        {tests.map((test, i) => (
          <Entry key={test.name} onClick={() => setActiveTest(i)}>
            {test.name}
          </Entry>
        ))}
      </Bar>
    </div>
  );
}
