import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  allowedDevOrigins: process.env.GOODFIND_DEV_ORIGIN ? [process.env.GOODFIND_DEV_ORIGIN] : [],
};

export default nextConfig;
