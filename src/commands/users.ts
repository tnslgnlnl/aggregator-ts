import {setUser} from "../config.js";

export function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length < 1) {
    throw new Error("Username is required for login command");
  }
  setUser(args[0]);
  console.log(`User ${args[0]} logged in successfully.`);
}