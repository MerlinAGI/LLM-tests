import React from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import type { Test } from "../pages/index";

const TextArea = styled.textarea`
  height: 250px;
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

const Wrapper = styled.div`
  border: 1px solid red;
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
      <h1>New test</h1>
      <b>Enter a name</b>
      <br />
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <br />
      <b>Enter the chat history</b>
      <br />
      <TextArea value={history} onChange={(e) => setHistory(e.target.value)} />
      <br />
      <b>Enter the expected output</b>
      <br />
      <TextArea value={example} onChange={(e) => setExample(e.target.value)} />
      <br />
      <button
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
      </button>
    </Wrapper>
  );
}
