
export interface LocationItem {
  id: string;
  name: string;
  region: string;
}

export interface RouteRequest {
  sources: LocationItem[];
  destinations: LocationItem[];
}

export interface DashboardData {
  sources: LocationItem[];
  destinations: LocationItem[];
}

export interface Route {
  id: string;
  source: LocationItem;
  destinations: LocationItem[];
  createdAt: string;
}
