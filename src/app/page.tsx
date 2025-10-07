import Link from "next/link";

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

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...mockImage,...mockImage].map((image) => (
        <div key={image.id} className="w-48">
          <img src={image.url} alt="image" />
        </div>
        ))}
      </div>
      Hello (gallery in progress)
    </main>
  );
}
