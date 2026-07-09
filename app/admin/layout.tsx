import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <section className="h-screen flex-1 overflow-y-auto p-6 md:p-8">
        {children}
      </section>
    </main>
  );
}