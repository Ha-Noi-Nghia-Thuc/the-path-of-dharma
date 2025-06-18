import config from "@/lib/config";
import ImageKit from "imagekit";
import { type NextRequest, NextResponse } from "next/server";

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

// Initialize ImageKit instance
let imagekit: ImageKit | null = null;

try {
  if (publicKey && privateKey && urlEndpoint) {
    imagekit = new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint,
    });
  }
} catch (error) {
  console.error("Failed to initialize ImageKit:", error);
}

/**
 * GET handler for ImageKit authentication
 * Returns authentication parameters for client-side uploads
 */
export async function GET(request: NextRequest) {
  try {
    // Check if ImageKit is initialized
    if (!imagekit) {
      console.error("ImageKit not initialized. Missing configuration:", {
        publicKey: !!publicKey,
        privateKey: !!privateKey,
        urlEndpoint: !!urlEndpoint,
      });

      return NextResponse.json(
        {
          error: "ImageKit configuration is incomplete",
          details: "Please check your environment variables",
        },
        { status: 500 }
      );
    }

    const authParams = imagekit.getAuthenticationParameters();

    // Validate auth params
    if (!authParams.token || !authParams.expire || !authParams.signature) {
      console.error("Invalid auth params from ImageKit:", authParams);
      return NextResponse.json(
        { error: "Failed to generate valid authentication parameters" },
        { status: 500 }
      );
    }

    console.log(
      "ImageKit auth successful for request from:",
      request.headers.get("origin")
    );

    return NextResponse.json(authParams, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("ImageKit authentication error:", error);

    return NextResponse.json(
      {
        error: "Failed to get authentication parameters",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler for CORS preflight requests
 */
export async function OPTIONS(request: NextRequest) {
  console.log("CORS preflight request from:", request.headers.get("origin"));

  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}
