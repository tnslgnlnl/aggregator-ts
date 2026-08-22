import {setUser, readConfig} from "../config.js";
import {createUser, getUserByName, resetUsers, getUsers} from "../lib/db/queries/users.js";

export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length < 1) {
    throw new Error("Username is required for login command");
  }
  const existingUser = await getUserByName(args[0]);
  if (!existingUser) {
    throw new Error(`User ${args[0]} does not exist`);
  }
  setUser(args[0]);
  console.log(`User ${args[0]} logged in successfully.`);
}

export async function handlerRegister(cmdName: string, ...args: string[]) {
  if (args.length < 1) {
      throw new Error("Username is required for register command");
  }
  const existingUser = await getUserByName(args[0]);
    if (existingUser) {
        throw new Error(`User ${args[0]} already exists`);
    }
  const newUser = await createUser(args[0]);
  setUser(newUser.name);
  console.log(`User ${newUser.name} registered and logged in successfully.`);
}

export async function handlerReset(cmdName: string, ...args: string[]) {
    await resetUsers();
    console.log("Database reset successfully!");
}

export async function handlerUsers(cmdName: string, ...args: string[]) {
    const users = await getUsers();
    const config = readConfig();
    for (let user of users) {
        if (user.name === config.currentUserName) {
            console.log(`* ${user.name} (current)`);
            continue;
        }
        console.log(`* ${user.name}`);
    }
}
