import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

const jokesTable = pgTable("jokes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: varchar({ length: 255 }).notNull(),
});

export { jokesTable };
