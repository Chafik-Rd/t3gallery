"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteImage } from "~/server/queries";

export async function deleteImageAction(id: number) {
  await deleteImage(id);
  revalidatePath("/");
  redirect("/");
}
