import { Navbar } from "@/src/components/layout/Navbar";
import { Footer } from "@/src/components/layout/Footer";
import { FloatingButtons } from "@/src/components/ui/FloatingButtons";
import { getSocialSettings } from "@/src/modules/social/social.service";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const socialSettings = await getSocialSettings();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar socialSettings={socialSettings} />
      <main className="flex-1">
        {children}
      </main>
      <Footer socialSettings={socialSettings} />
      <FloatingButtons socialSettings={socialSettings} />
    </div>
  );
}
