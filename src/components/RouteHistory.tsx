
import { useState } from "react";
import { Route } from "@/types/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Clock, MapPin, Navigation, ChevronDown, ChevronRight, Trash } from "lucide-react";

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
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-700">
            <Clock className="h-5 w-5 text-purple-600" />
            Route History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <Clock className="h-16 w-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium mb-2">No routes created yet</p>
            <p className="text-sm">Create your first route to see it here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-700">
          <Clock className="h-5 w-5 text-purple-600" />
          Route History ({routes.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {routes.map((route) => {
            const isExpanded = expandedRoutes.has(route.id);
            
            return (
              <TooltipProvider key={route.id}>
                <div className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200">
                  {/* Route Header */}
                  <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors rounded-t-xl">
                    <div className="flex items-center gap-3 flex-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-purple-100"
                        onClick={() => toggleExpanded(route.id)}
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 text-purple-600" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-purple-600" />
                        )}
                      </Button>
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 cursor-pointer">
                            <MapPin className="h-4 w-4 text-blue-600" />
                            <span className="font-semibold text-gray-900">{route.source.name}</span>
                            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                              {route.source.region}
                            </Badge>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-sm">
                            <p><strong>Frame Rate:</strong> 30 fps</p>
                            <p><strong>Bit Rate:</strong> 200 mbps</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Navigation className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-600 font-medium">
                          {route.destinations.length} destination(s)
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {new Date(route.createdAt).toLocaleString()}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                        onClick={() => handleDelete(route.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Tree View Structure - Expanded Content */}
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                      <div className="pl-8 pt-4">
                        {/* Source in tree format */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-3 h-3 bg-blue-500 rounded-full shadow-sm"></div>
                          <span className="font-semibold text-gray-800">{route.source.name}</span>
                          <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
                            {route.source.region}
                          </Badge>
                        </div>
                        
                        {/* Tree structure for destinations */}
                        <div className="ml-1 relative">
                          {/* Vertical line */}
                          <div className="absolute left-1 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                          
                          {route.destinations.map((destination, index) => (
                            <div key={destination.id} className="flex items-center gap-3 py-2 relative">
                              {/* Horizontal connector */}
                              <div className="absolute left-0 top-1/2 w-4 h-0.5 bg-gray-300"></div>
                              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 ml-3 shadow-sm"></div>
                              <span className="text-sm text-gray-700 font-medium">{destination.name}</span>
                              <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                                {destination.region}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TooltipProvider>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteHistory;
