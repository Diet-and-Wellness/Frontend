"use client";

import AuthFormLayout from "../_components/AuthFormLayout";
import SigninForm from "../_components/SigninForm";

const SignIn = () => {
  return (
    <div className="w-full">
      <AuthFormLayout>
        <SigninForm />
      </AuthFormLayout>
    </div>
  );
};

export default SignIn;
