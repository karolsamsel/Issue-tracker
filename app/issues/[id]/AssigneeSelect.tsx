import { Select } from "@radix-ui/themes";
import React from "react";

const AssigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Item value="1">Karol Samsel</Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
