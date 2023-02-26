import React from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import type { Test } from "../pages/index";
import { Input, Button } from "antd";

const { TextArea } = Input;

const Wrapper = styled.div`
  flex-direction: column;
`;

interface Props {
  addTest: (test: Test) => void;
}

export default function NewTest({ addTest }: Props) {
  const [name, setName] = useState<string>("");
  const [history, setHistory] = useState<string>("");
  const [example, setExample] = useState<string>("");
  return (
    <Wrapper>
      <h1>Create a new test</h1>
      <b>Enter a name</b>
      <br />
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <br />
      <b>Enter the chat history</b>
      <br />
      <TextArea
        rows={4}
        value={history}
        onChange={(e) => setHistory(e.target.value)}
      />
      <br />
      <br />
      <b>Enter the expected output</b>
      <br />
      <TextArea
        rows={4}
        value={example}
        onChange={(e) => setExample(e.target.value)}
      />
      <br />
      <br />
      <Button
        type="primary"
        onClick={() => {
          addTest({
            name: name,
            history: history,
            example: example,
            output: null,
            status: null,
          });
          setName("");
          setHistory("");
          setExample("");
        }}
      >
        Add test
      </Button>
    </Wrapper>
  );
}
