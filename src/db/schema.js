const { integer, pgTable, varchar } = require("drizzle-orm/pg-core");

const jokesTable = pgTable("jokes", {
  id: integer().primaryKey({ autoIncrement: true }).generatedAlwaysAsIdentity(),
  text: varchar({ length: 255 }).notNull(),
});

module.exports = {
  jokesTable,
};
