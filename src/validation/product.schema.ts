import * as z from 'zod';

export const ProductSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name khong dc de trong' }),
  price: z.number().min(1, { message: 'price khong dc de trong' }),
  detailDesc: z
    .string()
    .trim()
    .min(1, { message: 'detailDesc khong dc de trong' }),
  shortDesc: z
    .string()
    .trim()
    .min(1, { message: 'shortDesc khong dc de trong' }),
  quantity: z.number().min(1, { message: 'quantity khong dc de trong' }),
  factory: z.string().trim().min(1, { message: 'factory khong dc de trong' }),
  target: z.string().trim().min(1, { message: 'target khong dc de trong' }),
});
export type TProductSchema = z.infer<typeof ProductSchema>;
