"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
  return (
    <div className="space-y-5 max-w-2xl">
      <TextField.Root variant="soft" placeholder="Title..." />
      <SimpleMDE placeholder="Description..." />
      <Button className="cursor-pointer">Create new Issue</Button>
    </div>
  );
};

export default NewIssuePage;
