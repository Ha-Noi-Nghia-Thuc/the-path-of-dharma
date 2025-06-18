const config = {
  env: {
    // Use window.location.origin in browser, fallback to localhost in development
    apiEndpoint:
      process.env.NEXT_PUBLIC_API_ENDPOINT ||
      (typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000"),
    prodApiEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT || "",
    imagekit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
    },
    databaseUrl: process.env.DATABASE_URL || "",
    upstash: {
      redisUrl: process.env.UPSTASH_REDIS_REST_URL || "",
      redisToken: process.env.UPSTASH_REDIS_REST_TOKEN || "",
      qstashUrl: process.env.QSTASH_URL || "",
      qstashToken: process.env.QSTASH_TOKEN || "",
      qstashCurrentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY || "",
      qstashNextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY || "",
    },
    smtp: {
      host: process.env.SMTP_HOST || "",
      port: process.env.SMTP_PORT || "587",
      user: process.env.SMTP_USER || "",
      pass: process.env.SMTP_PASS || "",
    },
  },
};

// Validate critical configuration in development
if (process.env.NODE_ENV === "development") {
  const requiredImageKitVars = ["publicKey", "urlEndpoint", "privateKey"];
  const missingImageKitVars = requiredImageKitVars.filter(
    (key) => !config.env.imagekit[key as keyof typeof config.env.imagekit]
  );

  if (missingImageKitVars.length > 0) {
    console.warn(
      "⚠️ Missing ImageKit environment variables:",
      missingImageKitVars
    );
    console.warn("Please add these to your .env.local file:");
    missingImageKitVars.forEach((varName) => {
      const envVarName =
        varName === "privateKey"
          ? "IMAGEKIT_PRIVATE_KEY"
          : `NEXT_PUBLIC_IMAGEKIT_${varName
              .toUpperCase()
              .replace("KEY", "_KEY")}`;
      console.warn(`${envVarName}=your_${varName}_here`);
    });
  }
}

export default config;
