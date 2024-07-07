export const enum FieldType {
  String = "string",
  Number = "number",
  Boolean = "boolean",
  Object = "object",
}

export const FieldTypes = [
  FieldType.String,
  FieldType.Number,
  FieldType.Boolean,
  FieldType.Object,
];

export interface IField {
  id: string;
  name: string;
  type: FieldType;
  description: string;
  fields?: IField[];
}
