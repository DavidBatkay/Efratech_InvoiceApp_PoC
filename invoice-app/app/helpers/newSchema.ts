// 1. The Generic Schema Class (You can move this to a shared utils folder later)
import React from "react";

export interface SchemaField<T> {
  dataIndex: Extract<keyof T, string>;
  title: string;
  type?: "text" | "number" | "date" | "boolean";
  showInTable?: boolean;
  enableSorting?: boolean;
  render?: (row: T) => React.ReactNode;
}

export class Schema<T> {
  constructor(public fields: SchemaField<T>[]) {}
}
