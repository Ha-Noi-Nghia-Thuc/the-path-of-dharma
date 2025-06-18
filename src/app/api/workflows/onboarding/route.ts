import { db } from "@/database/drizzle";
import { users } from "@/database/schemas";
import { generateEmailTemplate } from "@/lib/utils";
import { sendEmail } from "@/lib/workflows";
import { serve } from "@upstash/workflow/nextjs";
import { eq } from "drizzle-orm";

type UserState = "non-active" | "active";

interface InitialData {
  fullName: string;
  email: string;
}

// time constants in milliseconds
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const SEVEN_DAYS_IN_MS = 7 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

// determines user activity state based on last activity date
const getUserState = async (email: string): Promise<UserState> => {
  try {
    const [user] = await db
      .select({ lastActivityDate: users.lastActivityDate })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user?.lastActivityDate) {
      return "non-active";
    }

    const lastActivityDate = new Date(user.lastActivityDate!);
    const now = new Date();
    const timeDifference = now.getTime() - lastActivityDate.getTime();

    // user is considered non-active if they haven't been active for 7-30 days
    if (
      timeDifference > SEVEN_DAYS_IN_MS &&
      timeDifference < THIRTY_DAYS_IN_MS
    ) {
      return "non-active";
    }

    return "active";
  } catch (error) {
    console.error("Error getting user state:", error);
    return "non-active";
  }
};

// onboarding workflow handler
export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  // send welcome email immediately
  await context.run("new-signup", async () => {
    const { subject, html } = generateEmailTemplate("welcome", { fullName });
    await sendEmail({
      email,
      subject,
      message: html,
    });
  });

  // wait 7 days before starting the reminder cycle
  await context.sleep("wait-for-7-days", 60 * 60 * 24 * 7);

  // continuous reminder cycle
  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-reminder-email-non-active", async () => {
        const { subject, html } = generateEmailTemplate("remind7", {
          fullName,
        });
        await sendEmail({
          email,
          subject,
          message: html,
        });
      });
    } else if (state === "active") {
      await context.run("send-reminder-email-active", async () => {
        const { subject, html } = generateEmailTemplate("remind30", {
          fullName,
        });
        await sendEmail({
          email,
          subject,
          message: html,
        });
      });
    }

    // Wait 30 days before next check
    await context.sleep("wait-for-30-days", 60 * 60 * 24 * 30);
  }
});
