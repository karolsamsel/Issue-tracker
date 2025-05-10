"use client";
import { Button, TextField } from "@radix-ui/themes";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();

  return (
    <form
      className="space-y-5 max-w-2xl"
      onSubmit={handleSubmit((data) => {
        axios.post("/api/issues", data), router.push("/issues");
      })}
    >
      <TextField.Root
        variant="soft"
        placeholder="Title..."
        {...register("title")}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description..." {...field} />
        )}
      />
      <Button className="cursor-pointer">Create new Issue</Button>
    </form>
  );
};

export default NewIssuePage;
