import React from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import { Input, Button } from "antd";
import { Test } from "@/utils/types";
import { shopingAssistentPrompt } from "@/utils/data";

const { TextArea } = Input;

const Wrapper = styled.div`
  flex-direction: column;
  max-width: 500px;
`;

const InputTitle = styled.div`
  margin-bottom: 8px;
`;

const InputWrapper = styled.div`
  margin-bottom: 16px;
`;

interface Props {
  addTest: (test: Test) => void;
}

export default function NewTest({ addTest }: Props) {
  const [name, setName] = useState<string>("");
  const [history, setHistory] = useState<string>("");
  const [requirements, setRequirements] = useState<string>("");
  return (
    <Wrapper>
      <h1>Create a new test</h1>
      <InputWrapper>
        <InputTitle>Name the test</InputTitle>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Enter the chat history</InputTitle>
        <TextArea
          rows={4}
          value={history}
          onChange={(e) => setHistory(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Enter the requirements</InputTitle>
        <TextArea
          rows={4}
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
        />
      </InputWrapper>
      <Button
        type="primary"
        onClick={() => {
          addTest({
            name: name,
            prompt: shopingAssistentPrompt,
            values: { history: history },
            requirements: requirements,
            judgement: { status: "failed" },
          });
          setName("");
          setHistory("");
          setRequirements("");
        }}
      >
        Add test
      </Button>
    </Wrapper>
  );
}
