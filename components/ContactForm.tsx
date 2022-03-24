import React, { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import emailjs from "emailjs-com";
import { useMainContext } from "../context/main";
import {
  Box,
  Typography,
  Button,
  Card,
  Input,
  useMediaQuery,
} from "@mui/material";

type FormType = {
  email: string;
  subject: string;
  message: string;
};

export default function ContactForm({
  hasSent = false,
  setHasSent = (bool: boolean) => undefined,
  setError = (str: string) => undefined,
}): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const onSubmit = async (data) => {
    try {
      const res = await emailjs.send(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        data,
        process.env.NEXT_PUBLIC_USER_ID
      );
      if (res.status && res.status === 200) {
        setHasSent(true);
      }
    } catch (error) {
      console.log("error", error);
      setHasSent(true);
      setError("Oh no! It looks like there was a problem.");
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: isMobile ? 350 : 500, py: 3 }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", border: "none" }}
      >
        <Input
          placeholder="jon@jon.com"
          {...register("email")}
          sx={{
            marginBottom: 2,
            bgcolor: "#f1e6d5",
            border: "none",
            pl: 2,
            py: 2,
            mb: 2,
          }}
        />
        <Input
          placeholder="AT // OD podcast"
          {...register("subject")}
          sx={{
            marginBottom: 2,
            bgcolor: "#f1e6d5",
            border: "none",
            pl: 2,
            py: 2,
            mb: 2,
          }}
        />
        <Input
          placeholder="type message here"
          {...register("message")}
          sx={{
            marginBottom: 2,
            bgcolor: "#f1e6d5",
            border: "none",
            pl: 2,
            py: 2,
            mb: 2,
          }}
        />
        <Button
          type="submit"
          sx={{
            bgcolor: (theme) => theme.palette.primary.main,
            color: "white",
            py: 2,
            borderRadius: 25,
          }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}
