import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  subject: text('subject').notNull(),
  description: text('description').notNull(),
  coverImage: text('cover_image').notNull(),
  sortOrder: integer('sort_order').default(0),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  orderCode: text('order_code').notNull().unique(),
  fullName: text('full_name').notNull(),
  phone: text('phone').notNull(),
  age: integer('age').notNull(),
  serviceType: text('service_type').notNull(),
  contactMethod: text('contact_method').notNull(),
  requirements: text('requirements'),
  status: text('status').default('Mới nhận').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
