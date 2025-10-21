import type { CLICommand } from "../types/command.js";
import { commandExit } from "./commandExit.js";
import { commandHelp } from "./commandHelp.js";

// Returns an object (registry) mapping command names to handlers
export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
  };
}
