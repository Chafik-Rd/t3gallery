import { clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import { getImage } from "~/server/queries";
import { DeleteButton } from "./deleteButton";
import { redirect } from "next/navigation";

export default async function FullPageImageView(props: { id: number }) {
  let image;
  let uploaderInfo;

  try {
    image = await getImage(props.id);
    const client = await clerkClient();
    uploaderInfo = await client.users.getUser(image.userId);
  } catch (error) {
    redirect("/");
  }

  return (
    <div className="flex h-full w-full min-w-0">
      <div className="relative w-full flex-1 flex-shrink-0">
        <Image
          src={image.url}
          alt="image.name"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>

      <div className="flex w-48 flex-shrink-0 flex-col border-l">
        <div className="border-b p-2 text-center text-lg">{image.name}</div>

        <div className="p-2">
          <div>Uploaded By:</div>
          <div>{uploaderInfo.fullName}</div>
        </div>
        <div className="p-2">
          <div>Created On:</div>
          <div>{new Date(image.createdAt).toLocaleDateString()}</div>
        </div>
        <div className="p-2">
          <DeleteButton id={props.id} />
        </div>
      </div>
    </div>
  );
}
