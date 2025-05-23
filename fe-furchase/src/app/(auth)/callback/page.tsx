// src/app/(auth)/callback/index.tsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie } from "cookies-next";

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      setCookie("token", token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 10, // 10 hari
        sameSite: "lax",
      });

      router.push("/"); // redirect ke home setelah set cookie
    } else {
      router.push("/login"); // kalau token tidak ada
    }
  }, [searchParams, router]);

  return null; // Tidak perlu render apa pun
}
