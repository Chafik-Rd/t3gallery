"use server-only";

import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import { desc, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

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
