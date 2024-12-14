export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl">
      <div className="container mx-auto py-12 pb-16">{children}</div>
    </div>
  );
}
