"use client";

import AuthFormLayout from "../_components/AuthFormLayout";
import SignupForm from "../_components/SignupForm";

const SignUp = () => {
  return (
    <div className="w-full">
      <AuthFormLayout>
        <SignupForm />
      </AuthFormLayout>
    </div>
  );
};

export default SignUp;
