"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewIssuePage = () => {
  return (
    <div className="space-y-5 max-w-2xl">
      <TextField.Root variant="soft" placeholder="Title..." />
      <TextArea placeholder="Description..." />
      <Button className="cursor-pointer">Create new Issue</Button>
    </div>
  );
};

export default NewIssuePage;
