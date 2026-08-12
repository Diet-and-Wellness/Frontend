"use client";

import AuthFormLayout from "../_components/AuthFormLayout";
import CompleteProfileForm from "./_components/CompleteProfileForm";

const CompleteProfilePage = () => (
  <div className="w-full">
    <AuthFormLayout>
      <CompleteProfileForm />
    </AuthFormLayout>
  </div>
);

export default CompleteProfilePage;
