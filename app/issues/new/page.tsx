"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isSubmitting, setSubmitting] = useState(false);

  return (
    <div className="max-w-2xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form
        className="space-y-5"
        onSubmit={handleSubmit(async (data) => {
          try {
            setSubmitting(true);
            await axios.post("/api/issues", data), router.push("/issues");
          } catch (error) {
            setSubmitting(false);
            if (error instanceof Error) {
              setError(error.message);
            }
          }
        })}
      >
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextField.Root
          variant="soft"
          placeholder="Title..."
          {...register("title")}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description..." {...field} />
          )}
        />
        <Button disabled={isSubmitting}>
          Create new Issue {isSubmitting && <Spinner />}{" "}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
