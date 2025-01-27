// import { Link } from "@mui/material";
import Link from "next/link";
import React from "react";

type Props = {};

function page({}: Props) {
  return (
    <div>
      page sign up
      <Link href={"/auth/signin"}>Login</Link>
    </div>
  );
}

export default page;
