import { getImage } from "~/server/queries";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: photoId } = await params;
  const idAsNumber = Number(photoId);

  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  const image = await getImage(Number(idAsNumber));
  return (
    <div>
      <img src={image.url} className="w-96"/>
    </div>
  );
}
