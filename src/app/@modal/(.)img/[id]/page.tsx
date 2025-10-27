import { getImage } from "~/server/queries";
import { Modal } from "./modal";
import FullPageImageView from "~/components/full-image-page";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: photoId } = await params;
  const idAsNumber = Number(photoId);

  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  try {
    await getImage(idAsNumber);
  } catch (error) {
    return null;
  }
  return (
    <Modal>
      <FullPageImageView id={idAsNumber} />
    </Modal>
  );
}
