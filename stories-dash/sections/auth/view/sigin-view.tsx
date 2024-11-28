import { Metadata } from 'next';
import Link from 'next/link';
import UserAuthForm from '../user-auth-form';
import AuthWrapper from '../auth-wrapper';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignInViewPage() {
  return (
    <AuthWrapper>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome Back!</h1>
        <p className="text-sm text-muted-foreground">
          Please log in to continue.
        </p>
      </div>
      <div>
        <UserAuthForm />
      </div>
      <p className=" mt-2 text-sm font-thin">
        Don't have an account?{' '}
        <span>
          <Link className="font-normal underline" href="/sign-up">
            Signup
          </Link>
        </span>
      </p>
    </AuthWrapper>
  );
}
