import { useState, useEffect } from "react";
import { LocationItem, RouteRequest, Route } from "@/types/dashboard";
import { parseXMLData } from "@/utils/xmlParser";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import RouteHistory from "./RouteHistory";
import XCodeTemplates from "./XCodeTemplates";
import { useToast } from "@/hooks/use-toast";
import { Route as RouteIcon, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const [sources, setSources] = useState<LocationItem[]>([]);
  const [destinations, setDestinations] = useState<LocationItem[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(false);
  const [routing, setRouting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  // Extended XML data with more sources and destinations
  const fixedXMLData = `<data>
  <sources>
    <source>
      <name>Source A</name>
      <region>US-East</region>
    </source>
    <source>
      <name>Source B</name>
      <region>Europe</region>
    </source>
    <source>
      <name>Source C</name>
      <region>Asia-Pacific</region>
    </source>
    <source>
      <name>Source D</name>
      <region>Canada</region>
    </source>
    <source>
      <name>Source E</name>
      <region>South America</region>
    </source>
    <source>
      <name>Source F</name>
      <region>Africa</region>
    </source>
  </sources>
  <destinations>
    <destination>
      <name>Destination X</name>
      <region>Asia</region>
    </destination>
    <destination>
      <name>Destination Y</name>
      <region>US-West</region>
    </destination>
    <destination>
      <name>Destination Z</name>
      <region>Australia</region>
    </destination>
    <destination>
      <name>Destination Alpha</name>
      <region>Middle East</region>
    </destination>
    <destination>
      <name>Destination Beta</name>
      <region>Scandinavia</region>
    </destination>
    <destination>
      <name>Destination Gamma</name>
      <region>Southeast Asia</region>
    </destination>
    <destination>
      <name>Destination Delta</name>
      <region>Central Europe</region>
    </destination>
    <destination>
      <name>Destination Epsilon</name>
      <region>UK</region>
    </destination>
  </destinations>
</data>`;

  // Load routes from localStorage
  const loadRoutes = () => {
    try {
      const savedRoutes = localStorage.getItem('dashboard-routes');
      if (savedRoutes) {
        setRoutes(JSON.parse(savedRoutes));
      }
    } catch (error) {
      console.error('Error loading routes from localStorage:', error);
    }
  };

  // Save routes to localStorage
  const saveRoutes = (newRoutes: Route[]) => {
    try {
      localStorage.setItem('dashboard-routes', JSON.stringify(newRoutes));
    } catch (error) {
      console.error('Error saving routes to localStorage:', error);
    }
  };

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const parsedData = parseXMLData(fixedXMLData);
      setSources(parsedData.sources);
      setDestinations(parsedData.destinations);
      
      toast({
        title: "Data Loaded",
        description: `Loaded ${parsedData.sources.length} sources and ${parsedData.destinations.length} destinations.`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    loadRoutes();
  }, []);

  // XCode Templates handlers
  const handleXCodeSourceChange = (sourceId: string) => {
    setSelectedSources([sourceId]);
  };

  const handleXCodeDestinationChange = (destinationId: string, checked: boolean) => {
    setSelectedDestinations(prev => 
      checked 
        ? [...prev, destinationId]
        : prev.filter(id => id !== destinationId)
    );
  };

  const handleRoute = async () => {
    if (selectedSources.length === 0 || selectedDestinations.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select one source and at least one destination.",
        variant: "destructive",
      });
      return;
    }

    setRouting(true);

    try {
      const selectedSourceItems = sources.filter(source => 
        selectedSources.includes(source.id)
      );
      const selectedDestinationItems = destinations.filter(destination => 
        selectedDestinations.includes(destination.id)
      );

      const routeRequest: RouteRequest = {
        sources: selectedSourceItems,
        destinations: selectedDestinationItems,
      };

      // Create new route for history
      const newRoute: Route = {
        id: `route-${Date.now()}`,
        source: selectedSourceItems[0],
        destinations: selectedDestinationItems,
        createdAt: new Date().toISOString(),
      };

      // Add to routes and save to localStorage
      const updatedRoutes = [newRoute, ...routes];
      setRoutes(updatedRoutes);
      saveRoutes(updatedRoutes);

      console.log("Route request prepared:", routeRequest);

      toast({
        title: "Route Created",
        description: `Route prepared from ${selectedSourceItems[0]?.name} to ${selectedDestinationItems.length} destination(s).`,
      });

      // Clear selections after successful routing
      setSelectedSources([]);
      setSelectedDestinations([]);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Route request failed";
      toast({
        title: "Route Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setRouting(false);
    }
  };

  const handleDeleteRoute = (routeId: string) => {
    const updatedRoutes = routes.filter(route => route.id !== routeId);
    setRoutes(updatedRoutes);
    saveRoutes(updatedRoutes);
    
    toast({
      title: "Route Deleted",
      description: "Route has been successfully removed from history.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Routing Dashboard</h1>
          <p className="text-lg text-gray-600">Select one source and multiple destinations to create routes</p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* XCode Templates Section */}
        <XCodeTemplates
          sources={sources}
          destinations={destinations}
          selectedSource={selectedSources[0] || ""}
          selectedDestinations={selectedDestinations}
          onSourceChange={handleXCodeSourceChange}
          onDestinationChange={handleXCodeDestinationChange}
          onCreateRoute={handleRoute}
          loading={loading}
          routing={routing}
        />

        {/* Route History */}
        <RouteHistory routes={routes} onDeleteRoute={handleDeleteRoute} />
      </div>
    </div>
  );
};

export default Dashboard;
