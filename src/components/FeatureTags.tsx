import React from 'react';
import { SkipWithPrice } from '../types/skip';
import { Shield, Truck, CheckCircle2, Star } from 'lucide-react';

interface FeatureTagsProps {
  skip: SkipWithPrice;
  showAll?: boolean;
}

const FeatureTags: React.FC<FeatureTagsProps> = ({ skip, showAll = false }) => {
  const tags = [
    {
      condition: skip.allowed_on_road,
      label: 'Road Placement',
      color: 'bg-green-100 text-green-800',
      icon: Truck
    },
    {
      condition: skip.allows_heavy_waste,
      label: 'Heavy Waste',
      color: 'bg-blue-100 text-blue-800',
      icon: Shield
    },
    {
      condition: skip.hire_period_days >= 14,
      label: 'Extended Hire',
      color: 'bg-purple-100 text-purple-800',
      icon: CheckCircle2
    },
    {
      condition: skip.finalPrice < 350,
      label: 'Budget Friendly',
      color: 'bg-orange-100 text-orange-800',
      icon: Star
    }
  ].filter(tag => tag.condition);

  const displayTags = showAll ? tags : tags.slice(0, 2);

  return (
    <div className="flex flex-wrap gap-2">
      {displayTags.map((tag, index) => {
        const Icon = tag.icon;
        return (
          <span
            key={index}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${tag.color}`}
          >
            <Icon className="w-3.5 h-3.5" />
            {tag.label}
          </span>
        );
      })}
      {!showAll && tags.length > 2 && (
        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
          +{tags.length - 2} more
        </span>
      )}
    </div>
  );
};

export default FeatureTags;
