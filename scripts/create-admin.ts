import "dotenv/config";
import bcrypt from "bcryptjs";
import { createInterface } from "readline";
import { Pool } from "pg";
import { envSchema } from "@/lib/validations/env-schema";

const env = envSchema.parse(process.env);
const pool = new Pool({ connectionString: env.DATABASE_URL });

const rl = createInterface({ input: process.stdin, output: process.stdout });
const question = (q: string): Promise<string> =>
  new Promise((resolve) => rl.question(q, resolve));

async function main() {
  const userId = await question("userId : ");
  const password = await question("password: ");
  const fullName = await question("fullname: ");
  rl.close();

  if (!userId || !password || !fullName) {
    console.error("Semua field wajib diisi.");
    process.exit(1);
  }

  const existing = await pool.query(
    "SELECT 1 FROM users WHERE user_id = $1 LIMIT 1",
    [userId],
  );
  if (existing.rowCount && existing.rowCount > 0) {
    console.log(`Admin '${userId}' sudah ada, skip.`);
    await pool.end();
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await pool.query(
    `INSERT INTO users (user_id, password_hash, full_name, role) VALUES ($1, $2, $3, 'admin')`,
    [userId, passwordHash, fullName],
  );

  console.log(`\nSuper user '${userId}' berhasil dibuat.`);
  await pool.end();
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
