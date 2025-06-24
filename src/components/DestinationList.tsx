
import { LocationItem } from "@/types/dashboard";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "lucide-react";

interface DestinationListProps {
  destinations: LocationItem[];
  selectedDestinations: string[];
  onSelectionChange: (destinationId: string, checked: boolean) => void;
  loading?: boolean;
}

const DestinationList = ({ destinations, selectedDestinations, onSelectionChange, loading }: DestinationListProps) => {
  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5 text-green-600" />
            Destinations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
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
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="h-5 w-5 text-green-600" />
          Destinations ({destinations.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {destinations.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Navigation className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No destinations available</p>
            </div>
          ) : (
            destinations.map((destination) => (
              <div
                key={destination.id}
                className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors hover:bg-gray-50 ${
                  selectedDestinations.includes(destination.id) ? 'bg-green-50 border-green-200' : 'border-gray-200'
                }`}
              >
                <Checkbox
                  id={destination.id}
                  checked={selectedDestinations.includes(destination.id)}
                  onCheckedChange={(checked) => onSelectionChange(destination.id, !!checked)}
                />
                <div className="flex-1 min-w-0">
                  <label
                    htmlFor={destination.id}
                    className="block text-sm font-medium text-gray-900 cursor-pointer truncate"
                  >
                    {destination.name}
                  </label>
                  <p className="text-xs text-gray-500 truncate">{destination.region}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DestinationList;
