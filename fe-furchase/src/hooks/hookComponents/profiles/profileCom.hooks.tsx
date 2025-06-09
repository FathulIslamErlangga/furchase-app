import { useGlobal } from "@/components/contexts/GlobalContexts";
import { getData } from "@/services/addresses.services";
import { getDataUser } from "@/services/auth.services";
import { DataProfile, ResetPassword } from "@/utils/interfaces/customInterface";
import { deleteCookie, getCookie } from "cookies-next";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export const useProfileComponent = () => {
  const { auth, profiles } = useGlobal();
  const { profile, clearProfileMessage, message, status } = profiles;
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [isToast, setToast] = useState(false);
  const [isMenu, setMenu] = useState<
    "bio" | "address" | "password" | "adding" | "updating" | "view"
  >("bio");
  const [initialData, setInitialData] = useState<DataProfile | null>(null);
  const [formData, setFormData] = useState<DataProfile>({
    firstName: "",
    lastName: "",
    phone: "",
    coverProfile: "",
    thumbnailProfile: "",
  });
  const initialValues: ResetPassword = {
    newPassword: "",
    oldPassword: "",
  };
  const token = getCookie("jwt");
  const { slug } = useParams();
  const router = useRouter();
  const coverFileRef = useRef<HTMLInputElement | null>(null);
  const thumbFileRef = useRef<HTMLInputElement | null>(null);
  const skipRef = useRef(false);

  useEffect(() => {
    if (skipRef.current) {
      skipRef.current = false;
      return;
    }
    if (auth.user?.data.profiles) {
      const { firstName, lastName, phone } = auth.user.data.profiles;
      const initial = {
        firstName: firstName ?? "",
        lastName: lastName ?? "",
        phone: phone ?? "",
        coverProfile: "",
        thumbnailProfile: "",
      };
      setFormData(initial);
      setInitialData(initial);
      console.log("use effect initial", initial);
    }
  }, [auth.user]);

  useEffect(() => {
    if (profiles.message) {
      setToast(true);

      const timeout = setTimeout(() => {
        setToast(false);
        clearProfileMessage();
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [profiles.message]);

  // Start Handle Update Profile
  const mouseLeave = () => setOpen(false);
  const mouseIn = () => setOpen(true);
  const handleButtonUpdate = () => setUpdate((prev) => !prev);
  const handleCoverFile = () => coverFileRef.current?.click();
  const handleThumbFile = () => thumbFileRef.current?.click();
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    console.log("Input image change:", name, files);
    if (files && files.length > 0) {
      const imageUrl = URL.createObjectURL(files[0]);
      console.log("image", imageUrl);
      if (name === "coverProfile") {
        setFormData({ ...formData, coverProfile: imageUrl });
        const form = new FormData();
        form.append("coverProfile", files[0]);
        skipRef.current = true;
        await profile(form, slug as string);
      } else if (name === "thumbnailProfile") {
        setFormData({ ...formData, thumbnailProfile: imageUrl });
        const form = new FormData();
        form.append("thumbnailProfile", files[0]);
        skipRef.current = true;
        await profile(form, slug as string);
      }
    }
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();

    if (!initialData) return;

    if (formData.firstName !== initialData.firstName) {
      form.append("firstName", formData.firstName);
    }
    if (formData.lastName !== initialData.lastName) {
      form.append("lastName", formData.lastName);
    }
    if (formData.phone !== initialData.phone) {
      form.append("phone", formData.phone);
    }

    if (
      !form.has("firstName") &&
      !form.has("lastName") &&
      !form.has("phone") &&
      !form.has("coverProfile") &&
      !form.has("thumbnailProfile")
    ) {
      setUpdate(false);
      return;
    }

    await profile(form, slug as string);

    if (token) {
      await auth.getUsers(token as string);
    }
    const response = await getDataUser(token as string);
    console.log("slug lama", slug);
    console.log("slug baru", response.data.slug);

    if (response.data.slug && response.data.slug !== slug) {
      router.replace(`/profile/${response.data.slug}`);
    }
    setUpdate(false);
  };

  const handleChangePassword = async (values: ResetPassword) => {
    try {
      const response = await profiles.changePassword(values, slug as string);
      if (response) {
        deleteCookie("jwt");
        router.push("/login");
      }
    } catch (error) {
      console.log("change password:", error);
    }
  };
  // End Handle Update Profile

  return {
    auth,
    open,
    update,
    formData,
    coverFileRef,
    thumbFileRef,
    isToast,
    message,
    status,
    isMenu,
    initialValues,
    handleChangePassword,
    setMenu,
    mouseLeave,
    mouseIn,
    handleThumbFile,
    handleCoverFile,
    handleButtonUpdate,
    handleChangeValue,
    handleUpdate,
    handleImageChange,
  };
};
