"use server";

import { sendMail } from "@/app/utils/mail.utils";

export async function sendNodemailEmail({
  message,
  toEmail,
}: {
  message: string;
  toEmail: string;
}) {
  try {
    const result = await sendMail({
      sender: {
        name: "Driver APP",
        address: "serhiioberemchuk@gmail.com",
      },
      recepients: toEmail,
      subject: "test subject",
      message,
    });
    console.log("sendet>>", result);

    return result;
  } catch (error) {
    console.error(error);

    return error;
  }
}
