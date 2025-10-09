import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import { desc } from "drizzle-orm";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";

export const dynamic = "force-dynamic";

async function Images() {
  const imagesList: (typeof images.$inferSelect)[] = await db
    .select()
    .from(images)
    .orderBy(desc(images.id));
  return (
    <div className="flex flex-wrap gap-4">
      {imagesList.map((image) => (
        <div key={image.id} className="flex w-48 flex-col">
          <Image src={image.url} alt="image" width={192} height={192}/>
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
