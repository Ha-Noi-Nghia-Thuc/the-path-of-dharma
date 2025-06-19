import dummySutras from "../dummySutras.json";
import ImageKit from "imagekit";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import { sutras } from "./schemas";
import path from "path";
import fs from "fs";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

const uploadToImageKit = async (
  relativePathOrUrl: string,
  fileName: string,
  folder: string
) => {
  if (!relativePathOrUrl) {
    console.warn(`Skipping upload: no path or URL provided for ${fileName}`);
    return undefined;
  }

  try {
    const isUrl = relativePathOrUrl.startsWith("http");

    const file = isUrl
      ? relativePathOrUrl
      : (() => {
          const absolutePath = path.join(
            process.cwd(),
            "public",
            relativePathOrUrl
          );
          if (!fs.existsSync(absolutePath))
            throw new Error(`File not found: ${absolutePath}`);
          const stats = fs.statSync(absolutePath);
          if (!stats.isFile())
            throw new Error(
              `Invalid path: ${relativePathOrUrl} is not a file.`
            );
          return fs.readFileSync(absolutePath);
        })();

    const response = await imagekit.upload({ file, fileName, folder });
    return response.filePath;
  } catch (error) {
    console.error(`Error uploading ${fileName} to ImageKit:`, error);
    return undefined;
  }
};

const seed = async () => {
  console.log("Seeding data...");

  try {
    for (const sutra of dummySutras) {
      const { id, ...sutraData } = sutra;

      const coverUrl =
        (await uploadToImageKit(
          sutra.coverUrl,
          `${sutra.title}.jpg`,
          "/sutras/covers"
        )) ?? "";

      const videoUrl = sutra.videoUrl
        ? await uploadToImageKit(
            sutra.videoUrl,
            `${sutra.title}.mp4`,
            "/sutras/videos"
          )
        : "";

      await db.insert(sutras).values({
        ...sutraData,
        coverUrl,
        videoUrl,
      });
    }

    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

seed();
