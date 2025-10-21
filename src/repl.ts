import { cleanInput } from "./utils/cleanInput.js";
import type { State } from "./state.js";

export function startREPL(state: State) {
  const { rl, commands } = state;

  rl.prompt();

  rl.on("line", async (line: string) => {
    const words = cleanInput(line);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const cmdName = words[0];
    const cmd = commands[cmdName];

    if (cmd) {
      try {
        await cmd.callback(state);
      } catch (err) {
        console.error("Error running command:", (err as Error).message);
      }
    } else {
      console.log("Unknown command");
    }

    rl.prompt();
  });

  rl.on("close", () => {
    console.log("Exiting REPL. Goodbye!");
    process.exit(0);
  });
}
