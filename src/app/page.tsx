import Link from "next/link";
import { db } from "~/server/db";
import type { posts } from "~/server/db/schema";

export const dynamic = "force-dynamic";
const mockUrls = [
  "https://0dyl43y1ny.ufs.sh/f/dX9wTIRqfvshcduyDUCfplEULjX0gDS5eYF41ACnvrPuiB8H",
  "https://0dyl43y1ny.ufs.sh/f/dX9wTIRqfvshrClzaeBIcplRovEkmy6QFnL3jT8Cg5B9WOf7",
  "https://0dyl43y1ny.ufs.sh/f/dX9wTIRqfvshrdcykMBIcplRovEkmy6QFnL3jT8Cg5B9WOf7",
  "https://0dyl43y1ny.ufs.sh/f/dX9wTIRqfvshWJVbyNdRO7S3ehB2AK1DuGNxVPw6FaCjJ9b0",
];

const mockImage = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const postsList = await db.query.posts.findMany()

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {postsList.map((post) => (<div key={post.id}>{post.name}</div>))}
        {[...mockImage,...mockImage].map((image,index) => (
        <div key={image.id + "-" + index} className="w-48">
          <img src={image.url} alt="image" />
        </div>
        ))}
      </div>
      Hello (gallery in progress)
    </main>
  );
}
