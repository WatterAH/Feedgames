import Button from "@/components/ui/MyButton";
import Loader from "@/components/ui/Loader";
import React from "react";

interface Props {
  loading: boolean;
  disabled: boolean;
  text: string;
}

const SubmitButton: React.FC<Props> = ({ loading, disabled, text }) => {
  return (
    <div className="flex justify-center items-center relative">
      <Button type="submit" disabled={disabled}>
        {loading ? <Loader size="small" color="white" /> : text}
      </Button>
    </div>
  );
};

export default SubmitButton;
