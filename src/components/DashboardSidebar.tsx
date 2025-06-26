
import { useState } from "react";
import { LocationItem } from "@/types/dashboard";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Layers, MapPin, Navigation, Route as RouteIcon } from "lucide-react";

interface DashboardSidebarProps {
  sources: LocationItem[];
  destinations: LocationItem[];
  selectedSources: string[];
  selectedDestinations: string[];
  onSourceSelection: (sourceId: string, checked: boolean) => void;
  onDestinationSelection: (destinationId: string, checked: boolean) => void;
  onCreateRoute: () => void;
  loading?: boolean;
  routing?: boolean;
}

const DashboardSidebar = ({
  sources,
  destinations,
  selectedSources,
  selectedDestinations,
  onSourceSelection,
  onDestinationSelection,
  onCreateRoute,
  loading,
  routing
}: DashboardSidebarProps) => {
  const [sourcesExpanded, setSourcesExpanded] = useState(true);
  const [destinationsExpanded, setDestinationsExpanded] = useState(true);

  const LoadingSkeleton = ({ count = 5 }) => (
    <div className="space-y-2">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="flex items-center space-x-3 p-3 rounded-lg">
            <div className="w-4 h-4 bg-gray-200 rounded-sm"></div>
            <div className="flex-1 space-y-1.5">
              <div className="h-3.5 bg-gray-200 rounded w-3/4"></div>
              <div className="h-2.5 bg-gray-100 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-[360px] border-r border-gray-100 bg-white h-screen overflow-y-auto shadow-sm">
      {/* Enhanced Header */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Layers className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Routing Hub</h2>
            <p className="text-sm text-gray-600">Configure your streams</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Enhanced Sources Section */}
        <div>
          <Collapsible open={sourcesExpanded} onOpenChange={setSourcesExpanded}>
            <CollapsibleTrigger className="w-full group">
              <div className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <MapPin className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-gray-900">Sources</span>
                    <div className="text-xs text-gray-500">{sources.length} available</div>
                  </div>
                </div>
                <div className="p-1 rounded-md group-hover:bg-blue-100 transition-colors">
                  {sourcesExpanded ? (
                    <ChevronDown className="h-4 w-4 text-gray-600" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-600" />
                  )}
                </div>
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="mt-3 ml-2">
                {loading ? (
                  <LoadingSkeleton />
                ) : (
                  <RadioGroup
                    value={selectedSources[0] || ""}
                    onValueChange={(value) => {
                      selectedSources.forEach(id => onSourceSelection(id, false));
                      if (value) {
                        onSourceSelection(value, true);
                      }
                    }}
                    className="space-y-2"
                  >
                    {sources.map((source) => (
                      <div 
                        key={source.id} 
                        className={`flex items-center space-x-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer hover:shadow-sm ${
                          selectedSources.includes(source.id) 
                            ? 'bg-blue-50 border-blue-200 shadow-sm' 
                            : 'bg-white border-gray-100 hover:bg-gray-50'
                        }`}
                      >
                        <RadioGroupItem value={source.id} id={source.id} className="text-blue-600" />
                        <Label htmlFor={source.id} className="flex-1 cursor-pointer">
                          <div className="font-medium text-gray-900 text-sm">{source.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{source.region}</div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Enhanced Destinations Section */}
        <div>
          <Collapsible open={destinationsExpanded} onOpenChange={setDestinationsExpanded}>
            <CollapsibleTrigger className="w-full group">
              <div className="flex items-center justify-between p-3 hover:bg-green-50 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <Navigation className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-gray-900">Destinations</span>
                    <div className="text-xs text-gray-500">{destinations.length} available</div>
                  </div>
                </div>
                <div className="p-1 rounded-md group-hover:bg-green-100 transition-colors">
                  {destinationsExpanded ? (
                    <ChevronDown className="h-4 w-4 text-gray-600" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-600" />
                  )}
                </div>
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="mt-3 ml-2">
                {loading ? (
                  <LoadingSkeleton />
                ) : (
                  <div className="space-y-2">
                    {destinations.map((destination) => (
                      <div
                        key={destination.id}
                        className={`flex items-center space-x-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer hover:shadow-sm ${
                          selectedDestinations.includes(destination.id) 
                            ? 'bg-green-50 border-green-200 shadow-sm' 
                            : 'bg-white border-gray-100 hover:bg-gray-50'
                        }`}
                      >
                        <Checkbox
                          id={destination.id}
                          checked={selectedDestinations.includes(destination.id)}
                          onCheckedChange={(checked) => onDestinationSelection(destination.id, !!checked)}
                          className="border-green-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                        />
                        <Label htmlFor={destination.id} className="flex-1 cursor-pointer">
                          <div className="font-medium text-gray-900 text-sm">{destination.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{destination.region}</div>
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Simplified Create Route Section */}
        <Card className="border-2 border-dashed border-gray-200 bg-gradient-to-br from-gray-50 to-white shadow-sm">
          <CardContent className="p-6">
            <Button 
              onClick={onCreateRoute} 
              disabled={selectedSources.length === 0 || selectedDestinations.length === 0 || routing || loading} 
              size="lg" 
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RouteIcon className={`h-5 w-5 mr-2 ${routing ? 'animate-spin' : ''}`} />
              {routing ? 'Creating Route...' : 'Create Route'}
            </Button>
            
            {(selectedSources.length === 0 || selectedDestinations.length === 0) && (
              <p className="text-xs text-gray-500 text-center mt-2">
                Select source and destinations to create a route
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSidebar;
