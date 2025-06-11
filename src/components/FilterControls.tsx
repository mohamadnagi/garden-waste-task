
import React, { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Slider } from './ui/slider';

interface FilterControlsProps {
  onSearch: (query: string) => void;
  onPriceFilter: (range: [number, number]) => void;
  onFeatureFilter: (features: string[]) => void;
  onSort: (sortBy: string) => void;
  maxPrice: number;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  onSearch,
  onPriceFilter,
  onFeatureFilter,
  onSort,
  maxPrice
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('size');

  const features = ['Road Placement', 'Heavy Waste'];
  const sortOptions = [
    { value: 'size', label: 'Size (Low to High)' },
    { value: 'price', label: 'Price (Low to High)' },
    { value: 'price-desc', label: 'Price (High to Low)' }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const handlePriceChange = (range: number[]) => {
    const newRange: [number, number] = [range[0], range[1]];
    setPriceRange(newRange);
    onPriceFilter(newRange);
  };

  const handleFeatureToggle = (feature: string) => {
    const updated = selectedFeatures.includes(feature)
      ? selectedFeatures.filter(f => f !== feature)
      : [...selectedFeatures, feature];
    setSelectedFeatures(updated);
    onFeatureFilter(updated);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onSort(value);
  };

  return (
    <div className="bg-card rounded-lg border p-6 mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <input
          type="text"
          placeholder="Search skip sizes..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Price Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Price: £{priceRange[0]} - £{priceRange[1]}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-popover border">
            <div className="space-y-4">
              <h4 className="font-medium">Price Range</h4>
              <Slider
                value={priceRange}
                onValueChange={handlePriceChange}
                max={maxPrice}
                min={0}
                step={50}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>£{priceRange[0]}</span>
                <span>£{priceRange[1]}</span>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Feature Filters */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              Features
              {selectedFeatures.length > 0 && (
                <span className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                  {selectedFeatures.length}
                </span>
              )}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 bg-popover border">
            <div className="space-y-2">
              <h4 className="font-medium">Features</h4>
              {features.map((feature) => (
                <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes(feature)}
                    onChange={() => handleFeatureToggle(feature)}
                    className="rounded border-input"
                  />
                  <span className="text-sm">{feature}</span>
                </label>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Sort Options */}
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Quick Filter Chips */}
        <div className="flex gap-2">
          {selectedFeatures.map((feature) => (
            <span
              key={feature}
              className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-1 cursor-pointer"
              onClick={() => handleFeatureToggle(feature)}
            >
              {feature}
              <span className="ml-1">×</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
