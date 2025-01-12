import React from "react";
import { TutorialStep } from "./CreateGuide";
import { Minus, Plus } from "lucide-react";

interface Props {
  steps: TutorialStep[];
  setSteps: (steps: TutorialStep[]) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const StepControl: React.FC<Props> = ({
  steps,
  setSteps,
  currentStep,
  setCurrentStep,
}) => {
  const addStep = () => {
    const newStep = {
      id: Date.now().toString(),
      number: steps.length + 1,
      description: "",
    };
    setSteps([...steps, newStep]);
    setCurrentStep(steps.length);
  };

  const removeStep = (idToRemove: string) => {
    if (steps.length > 1) {
      const updatedSteps = steps
        .filter((step) => step.id !== idToRemove)
        .map((step, index) => ({
          ...step,
          number: index + 1,
        }));
      setSteps(updatedSteps);
      setCurrentStep(Math.min(currentStep, updatedSteps.length - 1));
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {steps.map((step, index) => (
        <button
          key={step.id}
          onClick={() => setCurrentStep(index)}
          className={`w-10 h-10 rounded-full transition-all ${
            currentStep === index
              ? "bg-threads text-white shadow-xl"
              : "bg-white/25 backdrop-blur-md border"
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={addStep}
        className="w-10 h-10 rounded-full border bg-white/50 backdrop-blur-sm"
      >
        <Plus className="w-4 h-4 mx-auto" />
      </button>
      {steps.length > 1 && (
        <button
          onClick={() => removeStep(steps[currentStep].id)}
          className="flex items-center text-red-400"
        >
          <Minus className="w-4 h-4 mr-2" />
          Eliminar paso
        </button>
      )}
    </div>
  );
};

export default StepControl;
