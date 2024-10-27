import Input from "@/components/Global/Input";
import Label from "@/components/Global/Label";
import React from "react";

interface Props {
  label: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

const FormField: React.FC<Props> = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col w-full items-start mt-4">
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

export default FormField;
