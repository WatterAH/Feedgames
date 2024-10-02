import Card from "@/components/Global/Card";

export default function NotifyPage() {
  return (
    <main className="flex flex-col lg:ml-20 h-screen justify-center items-center  bg-barcelona sm:pt-1 md:pt-4 gap-y-3">
      <h1 className="font-semibold text-threads hidden md:block">
        Notificaciones
      </h1>
      <Card></Card>
    </main>
  );
}
