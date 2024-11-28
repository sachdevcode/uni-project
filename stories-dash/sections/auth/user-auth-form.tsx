'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { signInApi } from '@/service/signin';
import { SignINSchema } from '@/lib/form-schema';
import { toast } from 'sonner';



type UserFormValue = z.infer<typeof SignINSchema>;

export default function UserAuthForm() {
  const router = useRouter();
  const [loading, startTransition] = useTransition();
  const defaultValues = {
    email: 'demo@gmail.com'
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(SignINSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    startTransition(async () => {
      try {
        const result = await signInApi(data);
        console.log('Success:', result);
        router.push('/dashboard');
        toast.success("successfully login")
        
      } catch (error: any) {
        console.error(error.message || 'An unexpected error occurred.');
        router.push('/dashboard');
        toast.error("login failed")
      }
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your Password..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full"
            variant="default"
            type="submit"
            disabled={loading}
          >
            SignIn
          </Button>
        </form>
      </Form>
    </>
  );
}
