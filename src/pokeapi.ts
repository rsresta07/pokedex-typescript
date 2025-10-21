export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

export type Location = {
  id: number;
  name: string;
  region?: { name: string; url: string };
};

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area?limit=20`;
    const res = await fetch(url);

    if (!res.ok) throw new Error(`Failed to fetch locations: ${res.status}`);
    const data: ShallowLocations = await res.json();
    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const res = await fetch(url);

    if (!res.ok) throw new Error(`Failed to fetch location: ${res.status}`);
    const data: Location = await res.json();
    return data;
  }
}
