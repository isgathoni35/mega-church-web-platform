import { DesignSystemShowcase } from "@/components/shared/DesignSystemShowcase";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center py-16 px-4 sm:px-8">
      <DesignSystemShowcase />
    </main>
  );
}
