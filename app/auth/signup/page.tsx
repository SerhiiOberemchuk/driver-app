"use client";

import { useActionState } from "react";
import register from "./action";

import {
  Button,
  Container,
  FormControl,
  FormGroup,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { redirect } from "next/navigation";
import { useNotifications } from "@toolpad/core";
import Link from "next/link";

function page() {
  const notifiction = useNotifications();
  const [error, submitAction, isPending] = useActionState(
    async (previosState: any, formData: FormData) => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const responsedb = await register({ email, password });
      console.log(previosState);

      if (responsedb.error) {
        notifiction.show(responsedb.error, {
          severity: "error",
          autoHideDuration: 2000,
        });
        return responsedb.error;
      }

      notifiction.show("Registrtion successfull!", {
        severity: "success",
        autoHideDuration: 2000,
      });

      redirect("/auth/signin");
      // return null;
    },
    null
  );

  return (
    <Container
      maxWidth={"xl"}
      sx={{
        height: "100svh",
        bgcolor: "white",
        display: "flex",
        flexDirection: "column",
        gap: 5,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography align="center" variant="h2" gutterBottom>
        Register
      </Typography>

      {error && (
        <Typography align="center" variant="h6" gutterBottom>
          {error}
        </Typography>
      )}
      <form
        action={submitAction}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FormGroup
          sx={{
            alignItems: "center",
            width: "100%",
            maxWidth: "500px",
            gap: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormControl>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input
              id="email"
              name="email"
              aria-describedby="user-credential-email"
              required
            />

            <FormHelperText id="user-credential-email">
              We'll never share your email.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password">User password</InputLabel>
            <Input
              id="password"
              name="password"
              aria-describedby="user-credential-password"
              required
            />
            <FormHelperText id="user-credential-password">
              We'll never share your password.
            </FormHelperText>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            disabled={isPending}
            color="primary"
          >
            Register
          </Button>

          <Typography align="center">
            Already have an account?
            <Link href="/auth/signin">Sign In</Link>
          </Typography>
        </FormGroup>
      </form>
    </Container>
  );
}

export default page;
