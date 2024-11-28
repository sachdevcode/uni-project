import { ACCEPTED_VIDEO_TYPES, MAX_VIDEO_SIZE } from '@/utils/constant';
import * as z from 'zod';

export const formSchema = z.object({
  video: z
    .any()
    .refine((files) => files?.length === 1, 'Video is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_VIDEO_SIZE,
      'Max video size is 100MB.'
    )
    .refine(
      (files) => ACCEPTED_VIDEO_TYPES.includes(files?.[0]?.type),
      '.mp4, .webm, and .ogg video files are accepted.'
    ),
  title: z.string().min(2, {
    message: 'Product name must be at least 2 characters.'
  }),
  products: z.any(),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.'
  })
});

export const SignupSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters' }),
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(7, { message: 'password must be greater than 7 chars' })
});

export const  SignINSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(7, { message: 'password must be greater than 7 chars' })
});