import type { State } from "../state.js";

export async function commandMapBack(state: State): Promise<void> {
  if (!state.prevLocationsURL) {
    console.log("you're on the first page");
    return;
  }

  try {
    const data = await state.pokeAPI.fetchLocations(state.prevLocationsURL);

    state.nextLocationsURL = data.next;
    state.prevLocationsURL = data.previous;

    for (const loc of data.results) console.log(loc.name);
  } catch (err) {
    console.error("Error fetching locations:", (err as Error).message);
  }
}
