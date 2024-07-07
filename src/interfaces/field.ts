export enum FieldType {
  String = "string",
  Number = "number",
  Boolean = "boolean",
  Object = "object",
  ArrayString = "array.string",
  ArrayNumber = "array.number",
  ArrayBoolean = "array.boolean",
  ArrayObject = "array.object",
}

export const FieldTypes = [
  { value: FieldType.String, label: "String" },
  { value: FieldType.Number, label: "Number" },
  { value: FieldType.Boolean, label: "Boolean" },
  { value: FieldType.Object, label: "Object" },
  { value: FieldType.ArrayString, label: "Array of String" },
  { value: FieldType.ArrayNumber, label: "Array of Number" },
  { value: FieldType.ArrayBoolean, label: "Array of Boolean" },
  { value: FieldType.ArrayObject, label: "Array of Object" },
];

export interface IField {
  id: string;
  name: string;
  type: FieldType;
  fields: IField[];
}
