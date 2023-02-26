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
import ReactDiffViewer from 'react-diff-viewer'

const { TextArea } = Input;

const Wrapper = styled.div`
  flex-direction: column;
`;

interface Props {
  prompt: string;
  newPrompt: string;
  setPrompt: (prompt: string) => void;
}

export default function Prompt({ prompt, newPrompt, setPrompt }: Props) {
  console.log("PROMPT", prompt, newPrompt);
  return (
    <Wrapper>
      <h1>Prompt</h1>
      {prompt === newPrompt && <TextArea
        autoSize={true}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />}
      {prompt !== newPrompt && <ReactDiffViewer
          oldValue={prompt}
          newValue={newPrompt}
          splitView={true}
        />
      }
    </Wrapper>
  );
}
