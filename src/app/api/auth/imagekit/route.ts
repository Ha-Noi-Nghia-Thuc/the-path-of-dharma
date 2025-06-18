import config from "@/lib/config";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

// initialize ImageKit instance
const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint });

// handler for ImageKit authentication
export async function GET() {
  try {
    const authParams = imagekit.getAuthenticationParameters();
    return NextResponse.json(authParams);
  } catch (error) {
    console.error("ImageKit authentication error:", error);
    return NextResponse.json(
      { error: "Failed to get authentication parameters" },
      { status: 500 }
    );
  }
}
