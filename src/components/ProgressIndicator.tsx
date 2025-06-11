import React from 'react';
import { CheckCircle, Circle, Zap } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: Array<{
    label: string;
    icon: React.ReactNode;
  }>;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  steps
}) => {
  return (
    <div className="w-full bg-card rounded-2xl border border-border p-4 md:p-8 mb-8 md:mb-12 modern-shadow">
      <div className="flex items-center justify-between overflow-x-auto">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-shrink-0">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xs md:text-sm font-bold transition-all duration-500 font-mono ${
                  index < currentStep
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : index === currentStep
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                    : 'bg-muted text-muted-foreground border border-border'
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle className="w-3 h-3 md:w-5 md:h-5" />
                ) : index === currentStep ? (
                  <Zap className="w-3 h-3 md:w-5 md:h-5" />
                ) : (
                  step.icon
                )}
              </div>
              <span className="mt-2 md:mt-3 text-xs text-center max-w-16 md:max-w-20 font-mono font-medium">
                {step.label.toUpperCase()}
              </span>
              {index === currentStep && (
                <div className="mt-1 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              )}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`w-8 md:w-20 h-1 mx-2 md:mx-6 rounded-full transition-all duration-500 ${
                  index < currentStep 
                    ? 'bg-gradient-to-r from-primary to-accent' 
                    : 'bg-muted'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4 md:mt-6 text-center">
        <p className="text-xs md:text-sm text-muted-foreground font-mono">
          {'>'} STEP {currentStep + 1} OF {totalSteps} • SYSTEM STATUS: ONLINE
        </p>
      </div>
    </div>
  );
};

export default ProgressIndicator;
