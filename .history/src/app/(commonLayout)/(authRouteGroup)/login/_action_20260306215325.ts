/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getDefaultDashboardRoute, isValidRedirectForRole, UserRole } from "@/lib/authUtils";
import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { ApiErrorResponse } from "@/types/api.types";
import { ILoginResponse } from "@/types/auth.types";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";
import { redirect } from "next/navigation";

export const loginAction = async (
  payload: ILoginPayload,
  redirectPath?: string
): Promise<ILoginResponse | ApiErrorResponse> => {

  // ✅ Validate payload using Zod
  const parsedPayload = loginZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0]?.message || "Invalid input";

    return {
      success: false,
      message: firstError,
    };
  }

  try {

    // ✅ API call
    const response = await httpClient.post<ILoginResponse>(
      "/auth/login",
      parsedPayload.data
    );

    const { accessToken, refreshToken, token, user } = response.data;
    const { role, emailVerified, needPasswordChange, email } = user;

    // ✅ Store tokens in cookies
    await setTokenInCookies("accessToken", accessToken);
    await setTokenInCookies("refreshToken", refreshToken);
    await setTokenInCookies(
      "better-auth.session_token",
      token,
      24 * 60 * 60
    ); // 1 day

    // ✅ Email verification check (optional)
    if (!emailVerified) {
      redirect(`/verify-email?email=${email}`);
    }

    // ✅ Password change required
    if (needPasswordChange) {
      redirect(`/reset-password?email=${email}`);
    }

    // ✅ Role based redirect
    const targetPath =
      redirectPath &&
      isValidRedirectForRole(redirectPath, role as UserRole)
        ? redirectPath
        : getDefaultDashboardRoute(role as UserRole);

    redirect(targetPath);

  } catch (error: any) {

    // ✅ Ignore Next.js redirect internal error
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    // ✅ Email not verified case
    if (error?.response?.data?.message === "Email not verified") {
      redirect(`/verify-email?email=${payload.email}`);
    }

    console.error("Login error:", error);

    return {
      success: false,
      message: error?.response?.data?.message || "Login failed",
    };
  }
};