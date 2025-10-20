export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: photoId } = await params;

  return (
    <div>
      <h1>photoId:{photoId}</h1>
    </div>
  );
}
