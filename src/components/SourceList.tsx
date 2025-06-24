
import { LocationItem } from "@/types/dashboard";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface SourceListProps {
  sources: LocationItem[];
  selectedSources: string[];
  onSelectionChange: (sourceId: string, checked: boolean) => void;
  loading?: boolean;
}

const SourceList = ({ sources, selectedSources, onSelectionChange, loading }: SourceListProps) => {
  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            Sources
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
          <MapPin className="h-5 w-5 text-blue-600" />
          Sources ({sources.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {sources.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No sources available</p>
            </div>
          ) : (
            sources.map((source) => (
              <div
                key={source.id}
                className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors hover:bg-gray-50 ${
                  selectedSources.includes(source.id) ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
                }`}
              >
                <Checkbox
                  id={source.id}
                  checked={selectedSources.includes(source.id)}
                  onCheckedChange={(checked) => onSelectionChange(source.id, !!checked)}
                />
                <div className="flex-1 min-w-0">
                  <label
                    htmlFor={source.id}
                    className="block text-sm font-medium text-gray-900 cursor-pointer truncate"
                  >
                    {source.name}
                  </label>
                  <p className="text-xs text-gray-500 truncate">{source.region}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SourceList;
