import * as z from 'zod';

export const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1, { message: 'Name khong dc de trong' }),
  price: z
    .string()
    .transform((val) => (val === '' ? 0 : Number(val)))
    .refine((num) => num > 0, {
      message: 'Số tiền tối thiểu là 1',
    }),
  detailDesc: z
    .string()
    .trim()
    .min(1, { message: 'detailDesc khong dc de trong' }),
  shortDesc: z
    .string()
    .trim()
    .min(1, { message: 'shortDesc khong dc de trong' }),
  quantity: z
    .string()
    .transform((val) => (val === '' ? 0 : Number(val)))
    .refine((num) => num > 0, {
      message: 'Số tiền tối thiểu là 1',
    }),
  factory: z.string().trim().min(1, { message: 'factory khong dc de trong' }),
  target: z.string().trim().min(1, { message: 'target khong dc de trong' }),
});
export type TProductSchema = z.infer<typeof ProductSchema>;
