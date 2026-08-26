import {setUser, readConfig} from "../config.js";
import {createUser, getUser, resetUsers, getUsers} from "../lib/db/queries/users.js";

export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("Username is required for login command");
  }
  const userName = args[0];
  const existingUser = await getUser(userName);

  if (!existingUser) {
    throw new Error(`User ${userName} does not exist`);
  }

  setUser(userName);
  console.log(`User ${userName} logged in successfully.`);
}

export async function handlerRegister(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
      throw new Error("Username is required for register command");
  }

  const userName = args[0];
  const newUser = await createUser(userName);
  if (!newUser) {
    throw new Error(`User ${userName} not found`);
  }
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
