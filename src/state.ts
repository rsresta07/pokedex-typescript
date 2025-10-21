import { createInterface, type Interface } from "readline";
import { getCommands } from "./utils/getCommands.js";
import { PokeAPI } from "./pokeapi.js";

// Define the shape of a single CLI command.
// Each command has a name, a short description, and an async callback that runs when invoked.
export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

// Define the global state of the REPL session.
// Contains the readline interface, all registered commands, an instance of the API client,
// and pagination URLs for browsing Pokémon locations.
export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
};

// Initialize and return a fully configured REPL state.
// Sets up the input/output interface, creates the API client, and registers available commands.
export function initState(): State {
  // Create a readline interface for user input and output.
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ", // The command-line prompt text.
  });

  const pokeAPI = new PokeAPI();
  const commands = getCommands();

  return {
    rl,
    commands,
    pokeAPI,
    nextLocationsURL: null,
    prevLocationsURL: null,
  };
}
