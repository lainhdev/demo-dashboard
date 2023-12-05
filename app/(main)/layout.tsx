import { NavigationBar } from "@/components/navigation/nagivation-bar";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="h-full">
      <NavigationBar />
      <main className="md:pl-[200px] h-full">
        <div className="px-5">{children}</div>
      </main>
      <Toaster />
    </div>
  );
}
