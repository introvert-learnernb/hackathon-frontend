"use server";

import axiosInstance from "@/lib/utils/axiosInstance";
import nameSplit from "@/utils/nameSplit";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const phoneNo = formData.get("phone");
  const name = formData.get("name")?.toString();
  const hasAcceptedTerms = !!formData.get("hasAcceptedTerms");
  const redirectUrl = "/auth/callback";

  const [firstName, middleName, lastName] = nameSplit(name as string);

  const data = {
    email,
    password,
    phoneNo,
    firstName,
    middleName,
    lastName,
    hasAcceptedTerms,
    redirectUrl,
  };

  for (const key in data) {
    if (!key) {
      throw new Error(`${key} is required`);
    }
  }

  console.log(data);

  try {
    const res = await axiosInstance.post("/user-app/users/signup", data);
    console.log(res?.data);
  } catch (error) {
    console.log(error);
  }

  //   if (error) {
  //     console.error(error.code + " " + error.message);
  //     return encodedRedirect("error", "/sign-up", error.message);
  //   } else {
  //     return encodedRedirect(
  //       "success",
  //       "/sign-up",
  //       "Thanks for signing up! Please check your email for a verification link."
  //     );
  //   }
};
