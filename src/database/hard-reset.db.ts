import { pgDb as db } from "@/lib";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const reset_sql_file_path = path.join(__dirname, "hard-reset.db.sql");

let admin = false;

process.argv.forEach((val) => {
  if (val === "--admin") {
    admin = true;
  }
});

if (!admin)
  throw new Error(
    "Dangerous action: use --admin to confirm administrative privileges."
  );

if (process.env.NODE_ENV === "production") {
  console.error("❌ Database reset is disabled in production.");
  process.exit(1);
}

export async function reset() {
  console.log("⏳ Resetting database...");
  const start = Date.now();

  const sqlContent = fs.readFileSync(reset_sql_file_path, "utf8");

  await db.execute(sqlContent);

  const end = Date.now();
  console.log(`✅ Reset end & took ${end - start}ms\n`);
  process.exit(0);
}

reset().catch((err) => {
  console.error("❌ Reset failed");
  console.error(err);
  process.exit(1);
});
