export type Prompt = {
  text: string;
  variables: string[];
};

//export type Requirement = string;

export type Judgement = {
  status: "passed" | "failed" | null;
  text: string;
  requirements: string[];
  improvements: string[];
};

export interface Test {
  name: string;
  prompt: Prompt;
  values: Record<string, string>;
  requirements: string;
  completion?: string;
  judgement?: Judgement;
}
