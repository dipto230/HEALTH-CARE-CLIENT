"use server";

import { redirect } from "next/navigation";
import { getDefaultDashboardRoute, isValidRedirectForRole, UserRole } from "@/lib/authUtils";
import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { ApiErrorResponse } from "@/types/api.types";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";

export const loginAction = async (
  payload: ILoginPayload,
  redirectPath?: string
): Promise<ApiErrorResponse | void> => {

  const parsedPayload = loginZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0]?.message || "Invalid input",
    };
  }

  try {
    const response = await httpClient.post("/auth/login", parsedPayload.data);

    const { accessToken, refreshToken, token, user } = response.data;
    const { role, emailVerified, needPasswordChange, email } = user;

    await setTokenInCookies("accessToken", accessToken);
    await setTokenInCookies("refreshToken", refreshToken);
    await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60);

    // 🔹 Business redirects (SUCCESS FLOW ONLY)

    if (!emailVerified) {
      redirect(`/verify-email?email=${email}`);
    }

    if (needPasswordChange) {
      redirect(`/reset-password?email=${email}`);
    }

    const targetPath =
      redirectPath && isValidRedirectForRole(redirectPath, role as UserRole)
        ? redirectPath
        : getDefaultDashboardRoute(role as UserRole);

    redirect(targetPath);

  } catch (error: any) {

    // 🔥 Rethrow Next.js redirect errors immediately
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    // 🔹 Convert API errors into UI errors
    if (error?.response?.data?.message === "Email not verified") {
      redirect(`/verify-email?email=${payload.email}`);
    }

    return {
      success: false,
      message: error?.response?.data?.message || "Login failed",
    };
  }
};