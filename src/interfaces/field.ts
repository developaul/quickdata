export const enum FieldType {
  String = "string",
  Number = "number",
  Boolean = "boolean",
}

export const FieldTypes = [
  FieldType.Boolean,
  FieldType.Number,
  FieldType.String,
];

export interface IField {
  id: string;
  name: string;
  type: FieldType;
  description: string;
}
