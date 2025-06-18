"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schemas";
import ratelimit from "@/ratelimit";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { triggerOnboardingWorkflow } from "../workflows";

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, password } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";

  const { success: limitPassed } = await ratelimit.limit(ip);
  if (!limitPassed) {
    return redirect("/too-fast");
  }

  // check if the user already exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    const [newUser] = await db
      .insert(users)
      .values({
        fullName,
        email,
        password: hashedPassword,
      })
      .returning();

    // trigger onboarding workflow
    await triggerOnboardingWorkflow({
      email: newUser.email,
      fullName: newUser.fullName,
    });

    await signInWithCredentials({ email, password });

    return { success: true };
  } catch (error) {
    console.error("Signup failed:", error);
    return { success: false, error: "Signup error" };
  }
};

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";

  const { success: limitPassed } = await ratelimit.limit(ip);
  if (!limitPassed) {
    return redirect("/too-fast");
  }

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.error("Signin failed:", error);
    return { success: false, error: "Signin error" };
  }
};
