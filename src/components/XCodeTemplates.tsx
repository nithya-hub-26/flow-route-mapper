
import { useState } from "react";
import { LocationItem } from "@/types/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, Code, MapPin, Navigation, Route as RouteIcon } from "lucide-react";

interface XCodeTemplatesProps {
  sources: LocationItem[];
  destinations: LocationItem[];
  selectedSource: string;
  selectedDestinations: string[];
  onSourceChange: (sourceId: string) => void;
  onDestinationChange: (destinationId: string, checked: boolean) => void;
  onCreateRoute: () => void;
  loading?: boolean;
  routing?: boolean;
}

const XCodeTemplates = ({
  sources,
  destinations,
  selectedSource,
  selectedDestinations,
  onSourceChange,
  onDestinationChange,
  onCreateRoute,
  loading,
  routing
}: XCodeTemplatesProps) => {
  const [sourceDropdownOpen, setSourceDropdownOpen] = useState(false);
  const [destinationDropdownOpen, setDestinationDropdownOpen] = useState(false);

  const selectedSourceItem = sources.find(s => s.id === selectedSource);
  const selectedDestinationCount = selectedDestinations.length;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Code className="h-6 w-6 text-purple-600" />
          XCode Templates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Source Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              Source
            </Label>
            <DropdownMenu open={sourceDropdownOpen} onOpenChange={setSourceDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between h-12 text-left px-4"
                  disabled={loading || sources.length === 0}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium">
                      {selectedSourceItem ? selectedSourceItem.name : "Select a source"}
                    </span>
                    {selectedSourceItem && (
                      <span className="text-xs text-gray-500">{selectedSourceItem.region}</span>
                    )}
                  </div>
                  <ChevronDown className="h-4 w-4 shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-96 p-4 bg-white border shadow-lg max-h-80 overflow-y-auto">
                <div className="mb-2">
                  <h4 className="font-medium text-sm text-gray-700 mb-3">Choose a source location:</h4>
                </div>
                <RadioGroup value={selectedSource} onValueChange={onSourceChange}>
                  <div className="space-y-1">
                    {sources.map((source) => (
                      <div key={source.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-200">
                        <RadioGroupItem value={source.id} id={`source-${source.id}`} className="mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <label
                            htmlFor={`source-${source.id}`}
                            className="block text-sm font-medium text-gray-900 cursor-pointer"
                          >
                            {source.name}
                          </label>
                          <p className="text-xs text-gray-500 mt-0.5">{source.region}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Destination Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <Navigation className="h-5 w-5 text-green-600" />
              Destination
            </Label>
            <DropdownMenu open={destinationDropdownOpen} onOpenChange={setDestinationDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between h-12 text-left px-4"
                  disabled={loading || destinations.length === 0}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium">
                      {selectedDestinationCount > 0 
                        ? `${selectedDestinationCount} destination${selectedDestinationCount > 1 ? 's' : ''} selected`
                        : "Select destinations"
                      }
                    </span>
                    {selectedDestinationCount > 0 && (
                      <span className="text-xs text-gray-500">
                        {selectedDestinationCount === 1 ? "1 location" : `${selectedDestinationCount} locations`}
                      </span>
                    )}
                  </div>
                  <ChevronDown className="h-4 w-4 shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-96 p-4 bg-white border shadow-lg max-h-80 overflow-y-auto">
                <div className="mb-2">
                  <h4 className="font-medium text-sm text-gray-700 mb-3">Choose destination locations:</h4>
                </div>
                <div className="space-y-1">
                  {destinations.map((destination) => (
                    <div key={destination.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-200">
                      <Checkbox
                        id={`destination-${destination.id}`}
                        checked={selectedDestinations.includes(destination.id)}
                        onCheckedChange={(checked) => onDestinationChange(destination.id, !!checked)}
                        className="mt-0.5"
                      />
                      <div className="flex-1 min-w-0">
                        <label
                          htmlFor={`destination-${destination.id}`}
                          className="block text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          {destination.name}
                        </label>
                        <p className="text-xs text-gray-500 mt-0.5">{destination.region}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Create Route Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={onCreateRoute}
            disabled={!selectedSource || selectedDestinations.length === 0 || routing || loading}
            size="lg"
            className="w-full sm:w-auto px-8"
          >
            <RouteIcon className={`h-4 w-4 mr-2 ${routing ? 'animate-pulse' : ''}`} />
            {routing ? 'Creating Route...' : 'Create Route'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default XCodeTemplates;
