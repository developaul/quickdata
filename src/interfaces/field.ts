export const enum FieldType {
  String = "String",
  Number = "Number",
  Boolean = "Boolean",
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
