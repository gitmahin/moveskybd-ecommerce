import { pgTable, pgEnum } from "drizzle-orm/pg-core"
import * as t from "drizzle-orm/pg-core"
import { is_deleted, table_timestamps } from "./helper"
import { NOTE_PRIVACY_TYPE_VALUES } from "./constants"
import { v4 as uuidv4 } from 'uuid';

export const NOTE_PRIVACY_TYPE_E = pgEnum("notes_privacy_type_enum", NOTE_PRIVACY_TYPE_VALUES)

export const notesTable = pgTable("notes", {
     id: t.uuid().primaryKey().notNull().unique().$defaultFn(uuidv4),
    privacy_type: NOTE_PRIVACY_TYPE_E().default("PRIVATE").notNull(),
    title: t.varchar({ length: 100 }),
    content: t.varchar({ length: 300 }).notNull(),
    ...is_deleted,
    ...table_timestamps
})