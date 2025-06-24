
import { useState, useEffect } from "react";
import { LocationItem, RouteRequest } from "@/types/dashboard";
import { fetchXMLData, sendRouteRequest } from "@/utils/api";
import { parseXMLData } from "@/utils/xmlParser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import SourceList from "./SourceList";
import DestinationList from "./DestinationList";
import { useToast } from "@/hooks/use-toast";
import { Route, RefreshCw, Settings, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const [sources, setSources] = useState<LocationItem[]>([]);
  const [destinations, setDestinations] = useState<LocationItem[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [routing, setRouting] = useState(false);
  const [xmlUrl, setXmlUrl] = useState("https://httpbin.org/xml");
  const [routeUrl, setRouteUrl] = useState("https://httpbin.org/post");
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  // Mock XML data for demo purposes
  const mockXMLData = `<?xml version="1.0" encoding="UTF-8"?>
<data>
  <sources>
    <source>
      <name>New York Hub</name>
      <region>North America</region>
    </source>
    <source>
      <name>London Gateway</name>
      <region>Europe</region>
    </source>
    <source>
      <name>Tokyo Central</name>
      <region>Asia Pacific</region>
    </source>
    <source>
      <name>Sydney Port</name>
      <region>Oceania</region>
    </source>
  </sources>
  <destinations>
    <destination>
      <name>Los Angeles Terminal</name>
      <region>North America</region>
    </destination>
    <destination>
      <name>Frankfurt Hub</name>
      <region>Europe</region>
    </destination>
    <destination>
      <name>Singapore Gateway</name>
      <region>Asia Pacific</region>
    </destination>
    <destination>
      <name>Mumbai Port</name>
      <region>Asia</region>
    </destination>
    <destination>
      <name>Dubai International</name>
      <region>Middle East</region>
    </destination>
  </destinations>
</data>`;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let xmlData: string;
      
      try {
        xmlData = await fetchXMLData(xmlUrl);
      } catch (fetchError) {
        console.log("Using mock data due to fetch error:", fetchError);
        xmlData = mockXMLData;
        toast({
          title: "Using Demo Data",
          description: "Unable to fetch from external server, using sample data instead.",
          variant: "default",
        });
      }

      const parsedData = parseXMLData(xmlData);
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
    fetchData();
  }, []);

  const handleSourceSelection = (sourceId: string, checked: boolean) => {
    setSelectedSources(prev => 
      checked 
        ? [...prev, sourceId]
        : prev.filter(id => id !== sourceId)
    );
  };

  const handleDestinationSelection = (destinationId: string, checked: boolean) => {
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
        description: "Please select at least one source and one destination.",
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

      console.log("Sending route request:", routeRequest);

      const response = await sendRouteRequest(routeRequest, routeUrl);
      
      toast({
        title: "Route Request Sent",
        description: `Successfully sent route with ${selectedSourceItems.length} sources and ${selectedDestinationItems.length} destinations.`,
      });

      console.log("Route response:", response);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Routing Dashboard</h1>
          <p className="text-lg text-gray-600">Select sources and destinations to create routes</p>
        </div>

        {/* Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="xmlUrl">XML Data URL</Label>
                <Input
                  id="xmlUrl"
                  value={xmlUrl}
                  onChange={(e) => setXmlUrl(e.target.value)}
                  placeholder="Enter XML data URL"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="routeUrl">Route API Endpoint</Label>
                <Input
                  id="routeUrl"
                  value={routeUrl}
                  onChange={(e) => setRouteUrl(e.target.value)}
                  placeholder="Enter route API endpoint"
                />
              </div>
            </div>
            <Button onClick={fetchData} disabled={loading} className="w-full md:w-auto">
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Loading...' : 'Refresh Data'}
            </Button>
          </CardContent>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sources */}
          <SourceList
            sources={sources}
            selectedSources={selectedSources}
            onSelectionChange={handleSourceSelection}
            loading={loading}
          />

          {/* Destinations */}
          <DestinationList
            destinations={destinations}
            selectedDestinations={selectedDestinations}
            onSelectionChange={handleDestinationSelection}
            loading={loading}
          />
        </div>

        {/* Selection Summary and Route Button */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  {selectedSources.length} sources selected
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  {selectedDestinations.length} destinations selected
                </span>
              </div>
              
              <Button
                onClick={handleRoute}
                disabled={selectedSources.length === 0 || selectedDestinations.length === 0 || routing || loading}
                size="lg"
                className="w-full sm:w-auto"
              >
                <Route className={`h-4 w-4 mr-2 ${routing ? 'animate-pulse' : ''}`} />
                {routing ? 'Creating Route...' : 'Create Route'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
