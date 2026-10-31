'use server';

import { db } from '@/db';
import { orders } from '@/db/schema';
import { revalidatePath } from 'next/cache';

export async function createOrder(formData: FormData) {
  const fullName = formData.get('fullName') as string;
  const phone = formData.get('phone') as string;
  const age = Number(formData.get('age'));
  const serviceType = formData.get('serviceType') as string;
  const contactMethod = formData.get('contactMethod') as string;
  const requirements = formData.get('requirements') as string;

  if (!fullName || !phone) return { error: 'Vui lòng nhập đủ thông tin!' };

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const orderCode = `NOVAS-${randomNum}`;

  await db.insert(orders).values({
    orderCode,
    fullName,
    phone,
    age,
    serviceType,
    contactMethod,
    requirements,
    status: 'Mới nhận',
  });

  revalidatePath('/admin');
  return { success: true, orderCode };
}
