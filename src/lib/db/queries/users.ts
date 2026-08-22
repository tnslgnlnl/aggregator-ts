import { db } from "../index.js";
import { users } from "../schema.js";
import { eq } from "drizzle-orm";

export async function createUser(name: string) {
  // Array destructuring is used to get the first item from the returned array. This is because drizzle returns an array of results, even if there is only one result.
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUserByName(name: string) {
  const [result] = await db.select().from(users).where(eq(users.name, name));
  return result;
}

export async function resetUsers() {
    await db.delete(users);
}

export async function getUsers() {
    return db.select().from(users);
}