import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { generateEmailTemplate } from "@/lib/utils";
import { sendEmail } from "@/lib/workflows";
import { serve } from "@upstash/workflow/nextjs";
import { eq } from "drizzle-orm";

type USerState = "non-active" | "active";

type InitialData = {
  fullName: string;
  email: string;
};

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const SEVEN_DAYS_IN_MS = 7 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

const getUserState = async (email: string): Promise<USerState> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length === 0) {
    return "non-active";
  }

  const lastActivityDate = new Date(user[0].lastActiivityDate!);
  const now = new Date();
  const timeDifference = now.getTime() - lastActivityDate.getTime();

  if (timeDifference > SEVEN_DAYS_IN_MS && timeDifference < THIRTY_DAYS_IN_MS) {
    return "non-active";
  }

  return "active";
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  // Welcome Email
  await context.run("new-signup", async () => {
    const { subject, html } = generateEmailTemplate("welcome", { fullName });
    await sendEmail({
      email,
      subject,
      message: html,
    });
  });

  await context.sleep("wait-for-7-days", 60 * 60 * 24 * 7);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
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
      await context.run("send-email-active", async () => {
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

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});
