import React from 'react';
import { SkipWithPrice } from '../types/skip';
import InteractiveTooltip from './InteractiveTooltip';
import FeatureTags from './FeatureTags';
import { Clock, Check, ArrowRight } from 'lucide-react';

interface SkipCardProps {
  skip: SkipWithPrice;
  isSelected: boolean;
  onSelect: (skip: SkipWithPrice) => void;
  onViewDetails?: (skip: SkipWithPrice) => void;
}

const SkipCard: React.FC<SkipCardProps> = ({ skip, isSelected, onSelect, onViewDetails }) => {
  const imageUrl = `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${skip.size}-yarder-skip.jpg`;
  
  return (
    <InteractiveTooltip skip={skip}>
      <div
        className={`group relative bg-card rounded-2xl shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer border overflow-hidden ${
          isSelected 
            ? 'border-primary modern-shadow ring-1 ring-primary/20 modern-border' 
            : 'border-border hover:border-primary/50 hover:shadow-primary/10'
        }`}
        onClick={() => onSelect(skip)}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 warm-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Size Badge */}
        {/* <div className={`absolute -top-2 -right-2 px-3 py-1 md:px-4 md:py-2 rounded-xl text-sm font-bold shadow-sm z-10 ${
          isSelected ? 'bg-primary text-white' : 'bg-accent text-white'
        }`}>
          {skip.size}Y
        </div> */}
        
          
        
        {/* Skip Image */}
        <div className="relative h-40 md:h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={`${skip.size} Yard Skip`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23f3f4f6"/%3E%3Ctext x="200" y="150" text-anchor="middle" fill="%236b7280" font-family="Inter" font-size="16"%3E' + skip.size + ' Yard Skip%3C/text%3E%3C/svg%3E';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          
          {/* Skip identifier */}
          <div className="absolute bottom-3 left-3 text-white/90 font-medium text-xs bg-black/20 px-2 py-1 rounded">
            {skip.size} Yard
          </div>
        </div>

        {/* Card Content */}
        <div className="relative p-4 md:p-6 space-y-4">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 font-display">
              {skip.size} Yard Skip
            </h3>
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-2xl md:text-3xl font-bold gradient-text">
                £{skip.finalPrice}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                £{skip.price_before_vat}
              </span>
            </div>
            <div className="flex items-center text-slate-500 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              {skip.hire_period_days} day hire period
            </div>
          </div>

          {/* Feature Tags */}
          <FeatureTags skip={skip} />


          {/* Action Button */}
          <button
            className={`w-full py-3 md:py-4 px-4 md:px-6 rounded-xl font-semibold transition-all duration-200 text-sm md:text-base ${
              isSelected
                ? 'bg-primary text-white shadow-sm hover:bg-primary/90'
                : 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-md hover:scale-[1.01]'
            }`}
          >
            {isSelected ? 'Selected' : 'Select Skip'}
          </button>
          
          {onViewDetails && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(skip);
              }}
              className="w-full py-2.5 px-4 rounded-lg border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-colors duration-200 text-sm flex items-center justify-center gap-2 group"
            >
              Compare Skip
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </InteractiveTooltip>
  );
};

export default SkipCard;
