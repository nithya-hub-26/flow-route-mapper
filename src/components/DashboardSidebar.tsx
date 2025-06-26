
import { useState } from "react";
import { LocationItem } from "@/types/dashboard";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Code2, MapPin, Navigation } from "lucide-react";

interface DashboardSidebarProps {
  sources: LocationItem[];
  destinations: LocationItem[];
  selectedSources: string[];
  selectedDestinations: string[];
  onSourceSelection: (sourceId: string, checked: boolean) => void;
  onDestinationSelection: (destinationId: string, checked: boolean) => void;
  loading?: boolean;
}

const DashboardSidebar = ({
  sources,
  destinations,
  selectedSources,
  selectedDestinations,
  onSourceSelection,
  onDestinationSelection,
  loading
}: DashboardSidebarProps) => {
  const [sourcesExpanded, setSourcesExpanded] = useState(true);
  const [destinationsExpanded, setDestinationsExpanded] = useState(true);

  const LoadingSkeleton = ({ count = 5 }) => (
    <div className="space-y-3">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="flex-1 space-y-1">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-[35%] min-w-[400px] border-r border-gray-200 bg-white h-screen overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Code2 className="h-6 w-6 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">XCode Templates</h2>
        </div>
      </div>
      
      <div className="p-4">
        {/* Sources Section */}
        <div className="mb-6">
          <Collapsible open={sourcesExpanded} onOpenChange={setSourcesExpanded}>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Sources ({sources.length})</span>
                </div>
                {sourcesExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="mt-2">
                {loading ? (
                  <LoadingSkeleton />
                ) : (
                  <RadioGroup
                    value={selectedSources[0] || ""}
                    onValueChange={(value) => {
                      // Clear previous selection and select new one
                      selectedSources.forEach(id => onSourceSelection(id, false));
                      if (value) {
                        onSourceSelection(value, true);
                      }
                    }}
                    className="space-y-3"
                  >
                    {sources.map((source) => (
                      <div key={source.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value={source.id} id={source.id} />
                        <Label htmlFor={source.id} className="flex-1 cursor-pointer">
                          <div className="font-medium text-gray-900">{source.name}</div>
                          <div className="text-xs text-gray-500">{source.region}</div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Destinations Section */}
        <div>
          <Collapsible open={destinationsExpanded} onOpenChange={setDestinationsExpanded}>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                <div className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Destinations ({destinations.length})</span>
                </div>
                {destinationsExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="mt-2">
                {loading ? (
                  <LoadingSkeleton />
                ) : (
                  <div className="space-y-3">
                    {destinations.map((destination) => (
                      <div
                        key={destination.id}
                        className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 ${
                          selectedDestinations.includes(destination.id) ? 'bg-green-50 border border-green-200' : ''
                        }`}
                      >
                        <Checkbox
                          id={destination.id}
                          checked={selectedDestinations.includes(destination.id)}
                          onCheckedChange={(checked) => onDestinationSelection(destination.id, !!checked)}
                        />
                        <Label htmlFor={destination.id} className="flex-1 cursor-pointer">
                          <div className="font-medium text-gray-900">{destination.name}</div>
                          <div className="text-xs text-gray-500">{destination.region}</div>
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
