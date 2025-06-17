"use client";

import AuthForm from "@/components/common/auth-form";
import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validations";
import React from "react";

const Page = () => {
  return (
    <AuthForm
      type="sign-up"
      schema={signUpSchema}
      defaultValues={{ fullName: "", email: "", password: "" }}
      onSubmit={signUp}
    />
  );
};

export default Page;
