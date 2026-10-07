import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://heavensgatesugutta.org");

  const routes = [
    "",
    "/about",
    "/sermons",
    "/events",
    "/orphanage",
    "/orphanage/donate",
    "/give",
    "/contact",
    "/prayer-request",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/sermons" || route === "/events" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/sermons" || route === "/give" ? 0.9 : 0.8,
  }));
}
