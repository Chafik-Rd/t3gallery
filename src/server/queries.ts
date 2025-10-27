"use server-only";

import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import analyticsServerClient from "./analytics";

export async function getMyImages() {
  const user = await auth();

  if (!user.userId) throw new Error("Unauthorized");

  const imagesList: (typeof images.$inferSelect)[] = await db
    .select()
    .from(images)
    .where(eq(images.userId, user.userId))
    .orderBy(desc(images.id));

  return imagesList;
}

export async function getImage(id: number) {
  const user = await auth();

  if (!user.userId) throw new Error("Unauthorized");

  const [image]: (typeof images.$inferSelect)[] = await db
    .select()
    .from(images)
    .where(eq(images.id, id))
    .limit(1);

  if (!image) throw new Error("Image not found");

  if (image.userId !== user.userId) throw new Error("Unauthorized");

  return image;
}
export async function deleteImage(id: number) {
  const user = await auth();

  if (!user.userId) throw new Error("Unauthorized");

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "delete image",
    properties: { imageId: id },
  });
}
