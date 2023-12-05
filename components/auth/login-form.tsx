"use client";
import { createClient } from "@/utils/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";

const supabase = createClient();

export default function Login() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["google", "github"]}
        redirectTo={process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL}
      />
    </div>
  );
}
