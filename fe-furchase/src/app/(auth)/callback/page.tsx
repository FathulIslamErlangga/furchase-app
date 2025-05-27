// src/app/(auth)/callback/index.tsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie } from "cookies-next";
import { toast } from "react-toastify";

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      toast.error(decodeURIComponent(error), {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      router.replace("/login");
    }
    if (token) {
      setCookie("jwt", token, {
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
