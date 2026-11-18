import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import bcrypt from "bcryptjs";

export async function createSuperUser(password: string, fullName: string) {
  const passwordHash = await bcrypt.hash(password, 12);
  const userId = `admin-${Date.now()}`;

  await db.insert(users).values({
    userId,
    passwordHash,
    fullName,
    role: "admin",
  });
}
