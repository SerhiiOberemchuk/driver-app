"use client";
import * as React from "react";
import { SignInPage } from "@toolpad/core/SignInPage";

import { providerMap } from "../../../auth";

import signIn from "./actions";
import Link from "next/link";

function SignUpLink() {
  return <Link href="/auth/signup">Sign up</Link>;
}

export default function SignIn() {
  return (
    <SignInPage
      providers={providerMap}
      signIn={signIn}
      slots={{
        signUpLink: SignUpLink,
      }}
    />
  );
}
