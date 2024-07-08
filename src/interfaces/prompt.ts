export enum PromptType {
  Form = "form",
  TypeScript = "typescript",
}

export const PromptTypes = [
  { value: PromptType.Form, label: "Form" },
  { value: PromptType.TypeScript, label: "TypeScript", disabled: true },
];
