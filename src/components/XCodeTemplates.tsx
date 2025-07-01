import { useState } from "react";
import { LocationItem } from "@/types/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Route as RouteIcon, Upload, Calendar, Settings, Monitor, Speaker, Clapperboard, Zap } from "lucide-react";
import SourceList from "./SourceList";
import DestinationList from "./DestinationList";

interface XCodeTemplatesProps {
  sources: LocationItem[];
  destinations: LocationItem[];
  selectedSource: string;
  selectedDestinations: string[];
  onSourceChange: (sourceId: string) => void;
  onDestinationChange: (destinationId: string, checked: boolean) => void;
  onCreateRoute: () => void;
  loading: boolean;
  routing: boolean;
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
  routing,
}: XCodeTemplatesProps) => {
  // Template configuration state
  const [templateName, setTemplateName] = useState("");
  const [numDevices, setNumDevices] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventInit, setEventInit] = useState(false);
  const [videoCodec, setVideoCodec] = useState("");
  const [audioCodec, setAudioCodec] = useState("");
  const [resolution, setResolution] = useState("");
  const [frameRate, setFrameRate] = useState("");
  const [selectedBitRates, setSelectedBitRates] = useState<string[]>([]);
  const [backupFile, setBackupFile] = useState<File | null>(null);
  
  // Additional form fields
  const [priority, setPriority] = useState("");
  const [networkType, setNetworkType] = useState("");
  const [encryption, setEncryption] = useState(false);
  const [monitoring, setMonitoring] = useState(false);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const bitRateOptions = ["150 mbps", "200 mbps", "250 mbps"];

  const handleBitRateToggle = (bitRate: string) => {
    setSelectedBitRates(prev => 
      prev.includes(bitRate) 
        ? prev.filter(rate => rate !== bitRate)
        : [...prev, bitRate]
    );
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setBackupFile(file);
  };

  const clearForm = () => {
    setTemplateName("");
    setNumDevices("");
    setStartTime("");
    setEndTime("");
    setEventInit(false);
    setVideoCodec("");
    setAudioCodec("");
    setResolution("");
    setFrameRate("");
    setSelectedBitRates([]);
    setBackupFile(null);
    setPriority("");
    setNetworkType("");
    setEncryption(false);
    setMonitoring(false);
    setDescription("");
    setTags("");
  };

  const handleCreateRoute = () => {
    onCreateRoute();
    clearForm();
  };

  const handleSourceSelection = (sourceId: string, checked: boolean) => {
    if (checked) {
      onSourceChange(sourceId);
    } else {
      onSourceChange("");
    }
  };

  if (loading) {
    return (
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading codec templates...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl border-0 bg-gradient-to-br from-white via-blue-50 to-purple-50">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-3 text-xl">
          <Settings className="h-6 w-6" />
          Codec Templates
        </CardTitle>
        <p className="text-blue-100 mt-2">Configure your streaming parameters and route settings</p>
      </CardHeader>
      
      <CardContent className="p-8 space-y-8">
        {/* Template Configuration */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Clapperboard className="h-5 w-5 text-purple-600" />
            Template Configuration
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Template Name */}
            <div className="space-y-2">
              <Label htmlFor="templateName" className="text-sm font-medium text-gray-700">Template Name</Label>
              <Input
                id="templateName"
                placeholder="Enter template name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Number of Devices */}
            <div className="space-y-2">
              <Label htmlFor="numDevices" className="text-sm font-medium text-gray-700">Number of Devices</Label>
              <Input
                id="numDevices"
                type="number"
                placeholder="0"
                value={numDevices}
                onChange={(e) => setNumDevices(e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-sm font-medium text-gray-700">Priority Level</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="border-gray-300 focus:border-blue-500">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Start Time */}
            <div className="space-y-2">
              <Label htmlFor="startTime" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Start Date & Time
              </Label>
              <Input
                id="startTime"
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* End Time */}
            <div className="space-y-2">
              <Label htmlFor="endTime" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                End Date & Time
              </Label>
              <Input
                id="endTime"
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Network Type */}
            <div className="space-y-2">
              <Label htmlFor="networkType" className="text-sm font-medium text-gray-700">Network Type</Label>
              <Select value={networkType} onValueChange={setNetworkType}>
                <SelectTrigger className="border-gray-300 focus:border-blue-500">
                  <SelectValue placeholder="Select network" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ethernet">Ethernet</SelectItem>
                  <SelectItem value="wifi">Wi-Fi</SelectItem>
                  <SelectItem value="cellular">Cellular</SelectItem>
                  <SelectItem value="satellite">Satellite</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Switches Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <Label htmlFor="eventInit" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-600" />
                Event Initialization
              </Label>
              <Switch
                id="eventInit"
                checked={eventInit}
                onCheckedChange={setEventInit}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <Label htmlFor="encryption" className="text-sm font-medium text-gray-700">Enable Encryption</Label>
              <Switch
                id="encryption"
                checked={encryption}
                onCheckedChange={setEncryption}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <Label htmlFor="monitoring" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Monitor className="h-4 w-4 text-green-600" />
                Real-time Monitoring
              </Label>
              <Switch
                id="monitoring"
                checked={monitoring}
                onCheckedChange={setMonitoring}
              />
            </div>
          </div>

          {/* Codec Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label htmlFor="videoCodec" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Monitor className="h-4 w-4" />
                Video Output Codec
              </Label>
              <Select value={videoCodec} onValueChange={setVideoCodec}>
                <SelectTrigger className="border-gray-300 focus:border-blue-500">
                  <SelectValue placeholder="Select codec" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="h264">H.264 (AVC)</SelectItem>
                  <SelectItem value="h265">H.265 (HEVC)</SelectItem>
                  <SelectItem value="vp9">VP9</SelectItem>
                  <SelectItem value="av1">AV1</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="audioCodec" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Speaker className="h-4 w-4" />
                Audio Output Codec
              </Label>
              <Select value={audioCodec} onValueChange={setAudioCodec}>
                <SelectTrigger className="border-gray-300 focus:border-blue-500">
                  <SelectValue placeholder="Select codec" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mp3">MP3</SelectItem>
                  <SelectItem value="aac">AAC</SelectItem>
                  <SelectItem value="flac">FLAC</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resolution" className="text-sm font-medium text-gray-700">Resolution</Label>
              <Input
                id="resolution"
                placeholder="1920x1080"
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="frameRate" className="text-sm font-medium text-gray-700">Frame Rate</Label>
              <Select value={frameRate} onValueChange={setFrameRate}>
                <SelectTrigger className="border-gray-300 focus:border-blue-500">
                  <SelectValue placeholder="Select FPS" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 fps</SelectItem>
                  <SelectItem value="30">30 fps</SelectItem>
                  <SelectItem value="50">50 fps</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bit Rate List View */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Bit Rate Options</Label>
            <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-2 max-h-32 overflow-y-auto">
              {bitRateOptions.map((bitRate) => (
                <label key={bitRate} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={selectedBitRates.includes(bitRate)}
                    onChange={() => handleBitRateToggle(bitRate)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{bitRate}</span>
                </label>
              ))}
            </div>
            {selectedBitRates.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedBitRates.map((bitRate) => (
                  <Badge key={bitRate} variant="secondary" className="bg-blue-100 text-blue-700">
                    {bitRate}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter template description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[80px]"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags" className="text-sm font-medium text-gray-700">Tags (comma-separated)</Label>
            <Input
              id="tags"
              placeholder="streaming, live, broadcast"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Backup File Upload */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Backup Configuration
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="backupFile"
                accept=".json,.xml,.config"
              />
              <label htmlFor="backupFile" className="cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  {backupFile ? backupFile.name : "Click to upload backup file or drag and drop"}
                </p>
                <p className="text-xs text-gray-400 mt-1">JSON, XML, CONFIG files only</p>
              </label>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Source and Destination Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SourceList
            sources={sources}
            selectedSources={selectedSource ? [selectedSource] : []}
            onSelectionChange={handleSourceSelection}
          />
          
          <DestinationList
            destinations={destinations}
            selectedDestinations={selectedDestinations}
            onSelectionChange={onDestinationChange}
          />
        </div>

        {/* Create Route Button */}
        <div className="flex justify-center pt-6">
          <Button
            onClick={handleCreateRoute}
            disabled={!selectedSource || selectedDestinations.length === 0 || routing}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-xl"
          >
            {routing ? (
              <>
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Creating Route...
              </>
            ) : (
              <>
                <RouteIcon className="mr-2 h-5 w-5" />
                Create Route
              </>
            )}
          </Button>
        </div>

        {/* Selection Summary */}
        {(selectedSource || selectedDestinations.length > 0) && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <span>
                Selected: {selectedSource ? "1 source" : "No source"} → {selectedDestinations.length} destination(s)
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default XCodeTemplates;
