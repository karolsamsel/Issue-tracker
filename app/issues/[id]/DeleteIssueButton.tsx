"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DeleteIssueButton = ({ id }: { id: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <button className="btn bg-red-600 border-red-600">
            Delete Issue
          </button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action cannot be
            undone.
          </AlertDialog.Description>
          <Flex mt={"4"} gap={"3"}>
            <AlertDialog.Cancel>
              <Button className="!cursor-pointer" variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                className="!cursor-pointer"
                color="red"
                onClick={() => {
                  try {
                    axios.delete(`/api/issues/${id}`);
                    router.push("/issues");
                    router.refresh();
                  } catch (error) {
                    setError(true);
                  }
                }}
              >
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            Could not delete Issue.
          </AlertDialog.Description>
          <Button
            className="!cursor-pointer"
            variant="soft"
            color="gray"
            onClick={() => setError(false)}
            mt={"4"}
          >
            Okay
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
