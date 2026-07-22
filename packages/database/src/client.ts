import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/client/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "..", "dev.db"); // packages/database/dev.db

const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
export const prisma = new PrismaClient({ adapter });

export * from "../generated/client/client";
