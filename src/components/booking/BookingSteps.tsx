import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  name: string;
}

const steps: Step[] = [
  { id: 1, name: 'Service' },
  { id: 2, name: 'Schedule' },
  { id: 3, name: 'Details' },
  { id: 4, name: 'Confirm' },
];

interface BookingStepsProps {
  currentStep: number;
}

export default function BookingSteps({ currentStep }: BookingStepsProps) {
  return (
    <nav className="w-full" aria-label="Booking steps">
      <ol className="flex items-center justify-between" role="list">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isUpcoming = currentStep < step.id;

          return (
            <li key={step.id} className="flex items-center flex-1">
              <div className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-[#1a1a2e] text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                  aria-current={isCurrent ? 'step' : undefined}
                  aria-label={`Step ${step.id}: ${step.name}${isCompleted ? ' (completed)' : isCurrent ? ' (current)' : ''}`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <span aria-hidden="true">{step.id}</span>
                  )}
                </div>
                <span
                  className={`ml-3 text-sm font-medium hidden sm:block ${
                    currentStep >= step.id ? 'text-[#1a1a2e]' : 'text-gray-400'
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 sm:w-24 h-0.5 mx-2 sm:mx-4 transition-colors duration-300 ${
                    currentStep > step.id ? 'bg-emerald-500' : 'bg-gray-200'
                  }`}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

