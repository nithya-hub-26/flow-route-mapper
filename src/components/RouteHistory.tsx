
import { useState } from "react";
import { Route } from "@/types/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Navigation, ChevronDown, ChevronRight, Delete } from "lucide-react";

interface RouteHistoryProps {
  routes: Route[];
  onDeleteRoute?: (routeId: string) => void;
}

const RouteHistory = ({ routes, onDeleteRoute }: RouteHistoryProps) => {
  const [expandedRoutes, setExpandedRoutes] = useState<Set<string>>(new Set());

  const toggleExpanded = (routeId: string) => {
    const newExpanded = new Set(expandedRoutes);
    if (newExpanded.has(routeId)) {
      newExpanded.delete(routeId);
    } else {
      newExpanded.add(routeId);
    }
    setExpandedRoutes(newExpanded);
  };

  const handleDelete = (routeId: string) => {
    if (onDeleteRoute) {
      onDeleteRoute(routeId);
    }
  };

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
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {routes.map((route) => {
            const isExpanded = expandedRoutes.has(route.id);
            
            return (
              <div key={route.id} className="border border-gray-200 rounded-lg bg-white">
                {/* Route Header */}
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => toggleExpanded(route.id)}
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-gray-900">{route.source.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {route.source.region}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Navigation className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-600">
                        {route.destinations.length} destination(s)
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {new Date(route.createdAt).toLocaleString()}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(route.id)}
                    >
                      <Delete className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="pl-8 pt-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                          <span className="font-medium">Source:</span>
                        </div>
                        <div className="pl-4 mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm">{route.source.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {route.source.region}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                          <span className="font-medium">Destinations:</span>
                        </div>
                        <div className="pl-4 space-y-2">
                          {route.destinations.map((destination, index) => (
                            <div key={destination.id} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-sm">{destination.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {destination.region}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteHistory;
