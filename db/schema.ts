import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  orderCode: text('order_code').notNull(),
  fullName: text('full_name').notNull(),
  phone: text('phone').notNull(),
  age: text('age').notNull(),
  clientName: text('client_name').notNull(),
  service: text('service').notNull(),
  status: text('status').default('pending').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
