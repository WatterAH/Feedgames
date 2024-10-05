import React from "react";
import Label from "./Label";
import Input from "./Input";

interface Props {
  label: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

const FormField: React.FC<Props> = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col items-start mt-4">
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

export default FormField;
