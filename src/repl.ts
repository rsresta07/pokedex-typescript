import readline from "node:readline";
import { cleanInput } from "./utils/cleanInput.js";
import { getCommands } from "./utils/getCommands.js";

export function startREPL() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
  });

  const commands = getCommands();

  rl.prompt();

  rl.on("line", (line: string) => {
    const words = cleanInput(line);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const cmdName = words[0];
    const cmd = commands[cmdName];

    if (cmd) {
      try {
        cmd.callback(commands);
      } catch (err) {
        console.error("Error running command:", err);
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
