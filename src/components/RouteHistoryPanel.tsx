
import { Route } from "@/types/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Navigation, Trash2 } from "lucide-react";

interface RouteHistoryPanelProps {
  routes: Route[];
  onDeleteRoute: (routeId: string) => void;
}

const RouteHistoryPanel = ({ routes, onDeleteRoute }: RouteHistoryPanelProps) => {
  if (routes.length === 0) {
    return (
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-600" />
            Route History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <Clock className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No routes created yet</h3>
            <p className="text-sm">Create your first route to see it here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-purple-600" />
          Route History ({routes.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {routes.map((route) => (
            <div
              key={route.id}
              className="p-4 border border-gray-200 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-gray-900">{route.source.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {route.source.region}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    {new Date(route.createdAt).toLocaleString()}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteRoute(route.id)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <Navigation className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">
                  To {route.destinations.length} destination(s):
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {route.destinations.map((destination) => (
                  <Badge key={destination.id} variant="outline" className="text-xs">
                    {destination.name} ({destination.region})
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteHistoryPanel;
