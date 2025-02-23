"use client";

// import { Typography } from "@mui/material";
import React from "react";
import { sendNodemailEmail } from "./action";

type Props = {};

function PageRaport({}: Props) {
  return (
    //  <Typography>
    // {/* <h1>Raport</h1> */}

    <form
      action={(data) => {
        sendNodemailEmail({
          message: data.get("text") as string,
          toEmail: data.get("email") as string,
        });
      }}
    >
      <a href="tel:+"></a>
      <input type="email" placeholder="type email" className="" />
      <textarea name="text" id="text"></textarea>
      <button type="submit"> Send mail</button>
    </form>
    // {/* </Typography> */}
  );
}

export default PageRaport;
