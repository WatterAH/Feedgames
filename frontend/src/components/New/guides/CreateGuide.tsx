import React, { useState } from "react";
import Modal from "@/components/Global/Modal";
import { BookOpenText } from "lucide-react";
import Actions from "../layout/Actions";
import StepControl from "./StepControl";

export interface TutorialStep {
  id: string;
  number: number;
  description: string;
  image?: string;
}

const CreateGuide = () => {
  const [open, setOpen] = useState(false);
  const [steps, setSteps] = useState<TutorialStep[]>([
    { id: "1", number: 1, description: "" },
  ]);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <BookOpenText className="text-placeholder h-5" />
      </button>

      <Modal open={open} setOpen={setOpen} title="Nueva Guía">
        <Actions
          onClose={() => setOpen(false)}
          onSubmit={() => setOpen(false)}
        />

        <div className="flex flex-col gap-y-3 p-4 w-full">
          <input
            type="text"
            placeholder="Título de la guía"
            className="text-2xl font-bold bg-transparent border-none text-center shadow-none placeholder-gray-400 outline-none mx-auto w-full"
          />
          <StepControl
            steps={steps}
            setSteps={setSteps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>
      </Modal>
    </>
  );
};

export default CreateGuide;
