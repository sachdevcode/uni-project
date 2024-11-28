import { Metadata } from 'next';
import AuthWrapper from '../auth-wrapper';
import SignUpForm from '../sign-up-form';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignUpViewPage() {
  return (
    <AuthWrapper>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account!
        </h1>
        <p className="text-sm text-muted-foreground">
          provide all the required details
        </p>
      </div>
      <SignUpForm />
      <p className=" mt-2 text-sm font-thin">
        Already have an account?{' '}
        <span>
          <Link className="font-normal underline" href="/">
            LogIn
          </Link>
        </span>
      </p>
    </AuthWrapper>
  );
}
