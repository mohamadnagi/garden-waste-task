
import React from 'react';
import { SkipWithPrice } from '../types/skip';
import { ArrowRight, Zap, CheckCircle } from 'lucide-react';

interface SelectedSkipSummaryProps {
  selectedSkip: SkipWithPrice;
  onContinue: () => void;
}

const SelectedSkipSummary: React.FC<SelectedSkipSummaryProps> = ({ selectedSkip, onContinue }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border shadow-2xl z-50 animate-slide-up">
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6">
          <div className="flex items-center gap-3 md:gap-6 w-full sm:w-auto">
            <div className="w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-primary to-accent rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
              <div className="text-white font-bold text-sm md:text-xl font-mono">{selectedSkip.size}Y</div>
            </div>
            <div className="space-y-1 md:space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                <h3 className="font-bold text-sm md:text-xl text-foreground font-mono">
                  UNIT SKIP-{selectedSkip.size}Y LOCKED
                </h3>
              </div>
              <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                <span className="text-lg md:text-2xl font-bold gradient-text font-mono">
                  £{selectedSkip.finalPrice}
                </span>
                <span className="px-2 py-1 md:px-3 md:py-1 bg-primary/20 text-primary rounded-full text-xs md:text-sm font-mono">
                  {selectedSkip.hire_period_days}d deployment
                </span>
              </div>
              <p className="text-muted-foreground font-mono text-xs md:text-sm">
                {'>'} Ready for initialization sequence
              </p>
            </div>
          </div>
          
          <button
            onClick={onContinue}
            className="group w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-4 py-3 md:px-8 md:py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl font-mono flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base"
          >
            <Zap className="w-4 h-4 md:w-5 md:h-5" />
            INITIALIZE BOOKING
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedSkipSummary;
