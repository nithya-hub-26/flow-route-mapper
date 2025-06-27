
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
import { ChevronDown, Code, MapPin, Navigation } from "lucide-react";

interface XCodeTemplatesProps {
  sources: LocationItem[];
  destinations: LocationItem[];
  selectedSource: string;
  selectedDestinations: string[];
  onSourceChange: (sourceId: string) => void;
  onDestinationChange: (destinationId: string, checked: boolean) => void;
  loading?: boolean;
}

const XCodeTemplates = ({
  sources,
  destinations,
  selectedSource,
  selectedDestinations,
  onSourceChange,
  onDestinationChange,
  loading
}: XCodeTemplatesProps) => {
  const [sourceDropdownOpen, setSourceDropdownOpen] = useState(false);
  const [destinationDropdownOpen, setDestinationDropdownOpen] = useState(false);

  const selectedSourceItem = sources.find(s => s.id === selectedSource);
  const selectedDestinationCount = selectedDestinations.length;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5 text-purple-600" />
          XCode Templates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Source Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            Source
          </Label>
          <DropdownMenu open={sourceDropdownOpen} onOpenChange={setSourceDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between"
                disabled={loading || sources.length === 0}
              >
                <span className="truncate">
                  {selectedSourceItem ? selectedSourceItem.name : "Select a source"}
                </span>
                <ChevronDown className="h-4 w-4 shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-3 bg-white border shadow-lg">
              <RadioGroup value={selectedSource} onValueChange={onSourceChange}>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {sources.map((source) => (
                    <div key={source.id} className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50">
                      <RadioGroupItem value={source.id} id={`source-${source.id}`} />
                      <div className="flex-1 min-w-0">
                        <label
                          htmlFor={`source-${source.id}`}
                          className="block text-sm font-medium text-gray-900 cursor-pointer truncate"
                        >
                          {source.name}
                        </label>
                        <p className="text-xs text-gray-500 truncate">{source.region}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Destination Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Navigation className="h-4 w-4 text-green-600" />
            Destination
          </Label>
          <DropdownMenu open={destinationDropdownOpen} onOpenChange={setDestinationDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between"
                disabled={loading || destinations.length === 0}
              >
                <span className="truncate">
                  {selectedDestinationCount > 0 
                    ? `${selectedDestinationCount} destination${selectedDestinationCount > 1 ? 's' : ''} selected`
                    : "Select destinations"
                  }
                </span>
                <ChevronDown className="h-4 w-4 shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-3 bg-white border shadow-lg">
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {destinations.map((destination) => (
                  <div key={destination.id} className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50">
                    <Checkbox
                      id={`destination-${destination.id}`}
                      checked={selectedDestinations.includes(destination.id)}
                      onCheckedChange={(checked) => onDestinationChange(destination.id, !!checked)}
                    />
                    <div className="flex-1 min-w-0">
                      <label
                        htmlFor={`destination-${destination.id}`}
                        className="block text-sm font-medium text-gray-900 cursor-pointer truncate"
                      >
                        {destination.name}
                      </label>
                      <p className="text-xs text-gray-500 truncate">{destination.region}</p>
                    </div>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default XCodeTemplates;
