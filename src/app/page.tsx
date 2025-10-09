import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import { desc } from "drizzle-orm";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

async function Images() {
  const imagesList: (typeof images.$inferSelect)[] = await db
    .select()
    .from(images)
    .orderBy(desc(images.id));
  return (
    <div className="flex flex-wrap gap-4">
      {[...imagesList, ...imagesList, ...imagesList].map((image, index) => (
        <div key={image.id + "-" + index} className="flex w-48 flex-col">
          <img src={image.url} alt="image" />
          <div>{image.name}</div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-2xl text-center">Please sign in above</div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
