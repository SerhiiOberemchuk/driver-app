// "use server";
"use client";
import * as React from "react";
import { SignInPage } from "@toolpad/core/SignInPage";

import { providerMap } from "../../../auth";

import signIn from "./actions";
import { Link } from "@mui/material";

function SignUpLink() {
  return (
    <Link href="/auth/signup" variant="body2">
      Sign up
    </Link>
  );
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
