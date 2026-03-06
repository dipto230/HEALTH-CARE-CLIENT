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

  const parsedPayload = loginZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0].message || "Invalid input",
    };
  }

  try {
    const response = await httpClient.post<ILoginResponse>(
      "/auth/login",
      parsedPayload.data
    );

    const { accessToken, refreshToken, token, user } = response.data;
    const { role, needPasswordChange, email } = user;

    await setTokenInCookies("accessToken", accessToken);
    await setTokenInCookies("refreshToken", refreshToken);
    await setTokenInCookies(
      "better-auth.session_token",
      token,
      24 * 60 * 60
    );

    // ✅ decide redirect path first
    let targetPath = "";

    if (needPasswordChange) {
      targetPath = `/reset-password?email=${email}`;
    } else {
      targetPath =
        redirectPath &&
        isValidRedirectForRole(redirectPath, role as UserRole)
          ? redirectPath
          : getDefaultDashboardRoute(role as UserRole);
    }

    // ✅ redirect OUTSIDE condition blocks
    redirect(targetPath);

  } catch (error: any) {

    // ✅ allow NEXT_REDIRECT to pass through
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    // ❌ DO NOT redirect inside catch
    if (
      error?.response?.data?.message === "Email not verified"
    ) {
      return {
        success: false,
        message: "Email not verified",
      };
    }

    return {
      success: false,
      message: error?.response?.data?.message || "Login failed",
    };
  }
};