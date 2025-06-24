
import { LocationItem, DashboardData } from "@/types/dashboard";

export const parseXMLData = (xmlString: string): DashboardData => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");
  
  // Check for parsing errors
  const parserError = xmlDoc.querySelector("parsererror");
  if (parserError) {
    throw new Error("XML parsing failed: " + parserError.textContent);
  }

  const sources: LocationItem[] = [];
  const destinations: LocationItem[] = [];

  // Parse sources
  const sourceElements = xmlDoc.querySelectorAll("sources source, source");
  sourceElements.forEach((element, index) => {
    const name = element.querySelector("name")?.textContent || element.getAttribute("name") || `Source ${index + 1}`;
    const region = element.querySelector("region")?.textContent || element.getAttribute("region") || "Unknown";
    
    sources.push({
      id: `source-${index}`,
      name: name.trim(),
      region: region.trim()
    });
  });

  // Parse destinations
  const destElements = xmlDoc.querySelectorAll("destinations destination, destination");
  destElements.forEach((element, index) => {
    const name = element.querySelector("name")?.textContent || element.getAttribute("name") || `Destination ${index + 1}`;
    const region = element.querySelector("region")?.textContent || element.getAttribute("region") || "Unknown";
    
    destinations.push({
      id: `destination-${index}`,
      name: name.trim(),
      region: region.trim()
    });
  });

  return { sources, destinations };
};
