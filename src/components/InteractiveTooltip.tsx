
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { SkipWithPrice } from '../types/skip';

interface InteractiveTooltipProps {
  skip: SkipWithPrice;
  children: React.ReactNode;
}

const InteractiveTooltip: React.FC<InteractiveTooltipProps> = ({ skip, children }) => {
  const getSkipDetails = () => {
    const details = [];
    
    if (skip.transport_cost) {
      details.push(`Transport: £${skip.transport_cost}`);
    }
    
    if (skip.per_tonne_cost) {
      details.push(`Per tonne: £${skip.per_tonne_cost}`);
    }
    
    details.push(`VAT: ${skip.vat}%`);
    details.push(`Area: ${skip.postcode}`);
    
    return details;
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="max-w-xs bg-popover border p-4">
          <div className="space-y-2">
            <h4 className="font-semibold">{skip.size} Yard Skip Details</h4>
            <div className="text-sm space-y-1">
              {getSkipDetails().map((detail, index) => (
                <p key={index} className="text-muted-foreground">{detail}</p>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              <span className={`inline-block w-2 h-2 rounded-full ${skip.allowed_on_road ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-xs">{skip.allowed_on_road ? 'Road placement' : 'Private land only'}</span>
            </div>
            <div className="flex gap-2">
              <span className={`inline-block w-2 h-2 rounded-full ${skip.allows_heavy_waste ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-xs">{skip.allows_heavy_waste ? 'Heavy waste allowed' : 'Light waste only'}</span>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default InteractiveTooltip;
