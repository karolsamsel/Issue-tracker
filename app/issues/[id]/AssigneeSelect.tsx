"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/app/components";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const assignUser = (selectedValue: string) => {
    axios
      .patch(`/api/issues/${issue.id}`, {
        assignedToUserId:
          (selectedValue === "unassigned" ? null : selectedValue) || null,
      })
      .catch((error) => {
        toast("Unabled to assign a user");
      });
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "unassigned"}
        onValueChange={assignUser}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Item value="unassigned">Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <Toaster
        toastOptions={{
          style: {
            color: "red",
          },
        }}
      />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, // 60s,
    retry: 3,
  });

export default AssigneeSelect;
