import type { State } from "../state.js";

export async function commandMap(state: State): Promise<void> {
  try {
    const data = await state.pokeAPI.fetchLocations(
      state.nextLocationsURL || undefined
    );

    state.nextLocationsURL = data.next;
    state.prevLocationsURL = data.previous;

    for (const loc of data.results) console.log(loc.name);
  } catch (err) {
    console.error("Error fetching locations:", (err as Error).message);
  }
}

