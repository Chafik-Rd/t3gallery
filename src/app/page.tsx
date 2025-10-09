import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const imagesList: (typeof images.$inferSelect)[] = await db
    .select()
    .from(images)
    .orderBy(desc(images.id));

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {imagesList.map((image) => (
          <div key={image.id}>{image.name}</div>
        ))}
        {[...imagesList, ...imagesList].map((image, index) => (
          <div key={image.id + "-" + index} className="flex w-48 flex-col">
            <img src={image.url} alt="image" />
            <div>{image.name}</div>
          </div>
        ))}
      </div>
      Hello (gallery in progress)
    </main>
  );
}
