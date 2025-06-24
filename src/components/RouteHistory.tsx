
import { Route } from "@/types/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Navigation } from "lucide-react";

interface RouteHistoryProps {
  routes: Route[];
}

const RouteHistory = ({ routes }: RouteHistoryProps) => {
  if (routes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-600" />
            Route History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No routes created yet</p>
            <p className="text-sm">Create your first route to see it here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
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
              className="p-4 border border-gray-200 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-gray-900">{route.source.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {route.source.region}
                  </Badge>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(route.createdAt).toLocaleString()}
                </span>
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

export default RouteHistory;
