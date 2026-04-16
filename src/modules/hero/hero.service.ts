import { getHeroSettingsRecord, upsertHeroSettingsRecord } from "./hero.repository";

export interface HeroSettingsData {
  title: string;
  subtitle: string;
  image: string;
}

export async function getHeroSettings(): Promise<HeroSettingsData> {
  try {
    const settings = await getHeroSettingsRecord();
    
    if (!settings) {
      return { 
        title: "نبني المستقبل \nبجودة وإتقان", 
        subtitle: "شركة رائدة في مجال تصميم وتنفيذ المشاريع والمظلات وفق أعلى معايير الجودة.", 
        image: "/images/hero/hero-bg.gif"
      };
    }

    return {
      title: settings.title,
      subtitle: settings.subtitle,
      image: settings.image,
    };
  } catch (error) {
    console.error("Error fetching hero settings:", error);
    return { title: "", subtitle: "", image: "/images/hero/hero-bg.gif" };
  }
}

export async function updateHeroSettings(data: Partial<HeroSettingsData>): Promise<HeroSettingsData> {
  const title = data.title?.trim();
  const subtitle = data.subtitle?.trim() || "";
  const existing = await getHeroSettingsRecord();
  
  const image = data.image?.trim() || existing?.image || "/images/hero/hero-bg.gif";

  if (!title) {
    throw new Error("INVALID_HERO_INPUT");
  }

  const updated = await upsertHeroSettingsRecord({ title, subtitle, image });

  return {
    title: updated.title,
    subtitle: updated.subtitle,
    image: updated.image,
  };
}
