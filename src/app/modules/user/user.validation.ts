import { z, ZodError } from "zod";

const fullNameSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(1).max(20),
});

const addressSchema = z.object({
  street: z.string(),
  city: z.string().min(1),
  country: z.string().min(1),
});

const orderSchema = z.object({
  productName: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().positive(),
});

export const userValidationSchema = z.object({
  userId: z.number().positive(),
  username: z.string().min(1).max(15),
  password: z.string().min(6).max(20),
  fullName: fullNameSchema,
  age: z.number().positive(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1)),
  address: addressSchema,
  orders: z.array(orderSchema),
});