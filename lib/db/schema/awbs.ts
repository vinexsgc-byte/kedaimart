// lib/db/schema/awb.ts
import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const awb = pgTable(
  "awb",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    noAwb: text("no_awb").notNull().unique(),
    noResi: text("no_resi").notNull().unique(),
    noStation: text("no_station").notNull(),
    noStruk: text("no_struk").notNull(),
    tglStruk: timestamp("tgl_struk").notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [index("user_id_idx").on(t.userId)],
);

export type Awb = typeof awb.$inferSelect;
export type NewAwb = typeof awb.$inferInsert;
