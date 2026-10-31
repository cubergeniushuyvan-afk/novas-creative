'use server';

import { db } from '@/db';
import { orders } from '@/db/schema';
import { revalidatePath } from 'next/cache';

export async function createOrder(formData: FormData) {
  try {
    const fullName = formData.get('fullName')?.toString() || '';
    const phone = formData.get('phone')?.toString() || '';
    const age = formData.get('age')?.toString() || '';
    const clientName = formData.get('clientName')?.toString() || '';
    const service = formData.get('service')?.toString() || '';

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderCode = `NOVAS-${randomNum}`;

    await db.insert(orders).values({
      orderCode,
      fullName,
      phone,
      age,
      clientName,
      service,
      status: 'pending',
    });

    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Failed to create order:', error);
    return { success: false, error: 'Failed to create order' };
  }
}
