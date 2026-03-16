import Input from "@/components/Global/Input";
import Label from "@/components/Global/Label";
import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  label: string;
  id: string;
  type?: React.HTMLInputTypeAttribute;
}

const FormField: React.FC<Props> = ({
  value,
  onChange,
  label,
  id,
  type = "text",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <div className="flex flex-col">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        placeholder={label}
        value={value}
        onChange={handleChange}
        type={type}
      />
    </div>
  );
};

export default FormField;
