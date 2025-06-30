
import { useState } from "react";
import { LocationItem } from "@/types/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, Code, MapPin, Navigation, Route as RouteIcon, CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface XCodeTemplatesProps {
  sources: LocationItem[];
  destinations: LocationItem[];
  selectedSource: string;
  selectedDestinations: string[];
  onSourceChange: (sourceId: string) => void;
  onDestinationChange: (destinationId: string, checked: boolean) => void;
  onCreateRoute: () => void;
  loading?: boolean;
  routing?: boolean;
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
  routing
}: XCodeTemplatesProps) => {
  const [sourceDropdownOpen, setSourceDropdownOpen] = useState(false);
  const [destinationDropdownOpen, setDestinationDropdownOpen] = useState(false);
  
  // Form state
  const [templateName, setTemplateName] = useState("");
  const [numDevices, setNumDevices] = useState("");
  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();
  const [eventInitialization, setEventInitialization] = useState(false);
  const [videoCodec, setVideoCodec] = useState("");
  const [audioCodec, setAudioCodec] = useState("");
  const [resolution, setResolution] = useState("");
  const [frameRate, setFrameRate] = useState("");
  const [bitRate, setBitRate] = useState("");
  const [backupFile, setBackupFile] = useState<File | null>(null);

  const selectedSourceItem = sources.find(s => s.id === selectedSource);
  const selectedDestinationCount = selectedDestinations.length;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBackupFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setBackupFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Code className="h-6 w-6 text-purple-600" />
          Codec Templates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Source Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              Source
            </Label>
            <DropdownMenu open={sourceDropdownOpen} onOpenChange={setSourceDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between h-12 text-left px-4"
                  disabled={loading || sources.length === 0}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium">
                      {selectedSourceItem ? selectedSourceItem.name : "Select a source"}
                    </span>
                    {selectedSourceItem && (
                      <span className="text-xs text-gray-500">{selectedSourceItem.region}</span>
                    )}
                  </div>
                  <ChevronDown className="h-4 w-4 shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-96 p-4 bg-white border shadow-lg max-h-80 overflow-y-auto">
                <div className="mb-2">
                  <h4 className="font-medium text-sm text-gray-700 mb-3">Choose a source location:</h4>
                </div>
                <RadioGroup value={selectedSource} onValueChange={onSourceChange}>
                  <div className="space-y-1">
                    {sources.map((source) => (
                      <div key={source.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-200">
                        <RadioGroupItem value={source.id} id={`source-${source.id}`} className="mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <label
                            htmlFor={`source-${source.id}`}
                            className="block text-sm font-medium text-gray-900 cursor-pointer"
                          >
                            {source.name}
                          </label>
                          <p className="text-xs text-gray-500 mt-0.5">{source.region}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Destination Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <Navigation className="h-5 w-5 text-green-600" />
              Destination
            </Label>
            <DropdownMenu open={destinationDropdownOpen} onOpenChange={setDestinationDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between h-12 text-left px-4"
                  disabled={loading || destinations.length === 0}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium">
                      {selectedDestinationCount > 0 
                        ? `${selectedDestinationCount} destination${selectedDestinationCount > 1 ? 's' : ''} selected`
                        : "Select destinations"
                      }
                    </span>
                    {selectedDestinationCount > 0 && (
                      <span className="text-xs text-gray-500">
                        {selectedDestinationCount === 1 ? "1 location" : `${selectedDestinationCount} locations`}
                      </span>
                    )}
                  </div>
                  <ChevronDown className="h-4 w-4 shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-96 p-4 bg-white border shadow-lg max-h-80 overflow-y-auto">
                <div className="mb-2">
                  <h4 className="font-medium text-sm text-gray-700 mb-3">Choose destination locations:</h4>
                </div>
                <div className="space-y-1">
                  {destinations.map((destination) => (
                    <div key={destination.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-200">
                      <Checkbox
                        id={`destination-${destination.id}`}
                        checked={selectedDestinations.includes(destination.id)}
                        onCheckedChange={(checked) => onDestinationChange(destination.id, !!checked)}
                        className="mt-0.5"
                      />
                      <div className="flex-1 min-w-0">
                        <label
                          htmlFor={`destination-${destination.id}`}
                          className="block text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          {destination.name}
                        </label>
                        <p className="text-xs text-gray-500 mt-0.5">{destination.region}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Configuration Form */}
        <div className="border-t pt-8">
          <h3 className="text-lg font-semibold mb-6 text-gray-800">Template Configuration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Template Name */}
            <div className="space-y-2">
              <Label htmlFor="templateName">Template Name</Label>
              <Input
                id="templateName"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="Enter template name"
              />
            </div>

            {/* Number of Devices */}
            <div className="space-y-2">
              <Label htmlFor="numDevices">No of Devices</Label>
              <Input
                id="numDevices"
                type="number"
                value={numDevices}
                onChange={(e) => setNumDevices(e.target.value)}
                placeholder="Enter number of devices"
              />
            </div>

            {/* Event Initialization */}
            <div className="space-y-2">
              <Label htmlFor="eventInit">Event Initialization</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="eventInit"
                  checked={eventInitialization}
                  onCheckedChange={setEventInitialization}
                />
                <span className="text-sm text-gray-600">
                  {eventInitialization ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>

            {/* Start Time */}
            <div className="space-y-2">
              <Label>Start Time</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startTime && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startTime ? format(startTime, "PPP p") : "Select start time"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startTime}
                    onSelect={setStartTime}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* End Time */}
            <div className="space-y-2">
              <Label>End Time</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endTime && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endTime ? format(endTime, "PPP p") : "Select end time"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endTime}
                    onSelect={setEndTime}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Video Output Codec */}
            <div className="space-y-2">
              <Label>Video Output Codec</Label>
              <Select value={videoCodec} onValueChange={setVideoCodec}>
                <SelectTrigger>
                  <SelectValue placeholder="Select video codec" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="h264">H.264 (AVC)</SelectItem>
                  <SelectItem value="h265">H.265 (HEVC)</SelectItem>
                  <SelectItem value="vp9">VP9</SelectItem>
                  <SelectItem value="av1">AV1</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Audio Output Codec */}
            <div className="space-y-2">
              <Label>Audio Output Codec</Label>
              <Select value={audioCodec} onValueChange={setAudioCodec}>
                <SelectTrigger>
                  <SelectValue placeholder="Select audio codec" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mp3">MP3</SelectItem>
                  <SelectItem value="aac">AAC</SelectItem>
                  <SelectItem value="flac">FLAC</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Resolution */}
            <div className="space-y-2">
              <Label htmlFor="resolution">Resolution</Label>
              <Input
                id="resolution"
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                placeholder="e.g., 1920x1080"
              />
            </div>

            {/* Frame Rate */}
            <div className="space-y-2">
              <Label>Frame Rate</Label>
              <Select value={frameRate} onValueChange={setFrameRate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frame rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 fps</SelectItem>
                  <SelectItem value="30">30 fps</SelectItem>
                  <SelectItem value="50">50 fps</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bit Rate */}
            <div className="space-y-2">
              <Label>Bit Rate</Label>
              <Select value={bitRate} onValueChange={setBitRate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select bit rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="150">150 mbps</SelectItem>
                  <SelectItem value="200">200 mbps</SelectItem>
                  <SelectItem value="250">250 mbps</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Backup File Upload - Full Width */}
            <div className="space-y-2 md:col-span-2 lg:col-span-3">
              <Label>Backup</Label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600 mb-2">
                  {backupFile ? `Selected: ${backupFile.name}` : 'Drag and drop your backup file here, or click to browse'}
                </p>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="backup-file"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('backup-file')?.click()}
                >
                  Choose File
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Create Route Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={onCreateRoute}
            disabled={!selectedSource || selectedDestinations.length === 0 || routing || loading}
            size="lg"
            className="w-full sm:w-auto px-8"
          >
            <RouteIcon className={`h-4 w-4 mr-2 ${routing ? 'animate-pulse' : ''}`} />
            {routing ? 'Creating Route...' : 'Create Route'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default XCodeTemplates;
