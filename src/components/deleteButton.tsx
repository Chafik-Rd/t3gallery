"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";
import { deleteImageAction } from "~/app/actions/ImageAction";

export function DeleteButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();
  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteImageAction(id);
      } catch (error) {
        console.error("Failed to delete image:", error);
      }
    });
  };

  return (
    <Button onClick={handleDelete} disabled={isPending} variant="destructive">
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
