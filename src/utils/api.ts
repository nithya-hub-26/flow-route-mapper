
import { RouteRequest } from "@/types/dashboard";

export const fetchXMLData = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/xml, text/xml, */*',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    console.error('Error fetching XML data:', error);
    throw new Error('Failed to fetch XML data from server');
  }
};

export const sendRouteRequest = async (routeData: RouteRequest, endpoint: string): Promise<any> => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(routeData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending route request:', error);
    throw new Error('Failed to send route request to server');
  }
};
