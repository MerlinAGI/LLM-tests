import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";

const inter = Inter({ subsets: ["latin"] });

// text area
const TextArea = styled.textarea`
  height: 500px;
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

const Button = styled.button`
  // green button
  background-color: #2ecc71;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  width: 100px;
  align-self: flex-end;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

export default function Home() {
  return (
    <>
      <Global
        styles={css`
          body {
            background-color: #fff;
            min-height: 100vh;
            padding: 20px;
          }
        `}
      />
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>LLM Test Suite</h1>
        <LeftWrapper>
          <TextArea />
          <Button>Test</Button>
        </LeftWrapper>
      </main>
    </>
  );
}