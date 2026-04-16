import { getSocialSettingsRecord, upsertSocialSettingsRecord } from "./social.repository";

export interface SocialSettingsData {
  phone: string;
  whatsapp: string;
  email: string;
}

export async function getSocialSettings(): Promise<SocialSettingsData> {
  try {
    const settings = await getSocialSettingsRecord();
    
    if (!settings) {
      return { phone: "", whatsapp: "", email: "" };
    }

    return {
      phone: settings.phone,
      whatsapp: settings.whatsapp,
      email: settings.email,
    };
  } catch (error) {
    console.error("Error fetching social settings:", error);
    return { phone: "", whatsapp: "", email: "" };
  }
}

export async function updateSocialSettings(data: Partial<SocialSettingsData>): Promise<SocialSettingsData> {
  const phone = data.phone?.trim();
  const whatsapp = data.whatsapp?.trim();
  const email = data.email?.trim() || "";

  if (!phone || !whatsapp) {
    throw new Error("INVALID_SOCIAL_INPUT");
  }

  const updated = await upsertSocialSettingsRecord({ phone, whatsapp, email });

  return {
    phone: updated.phone,
    whatsapp: updated.whatsapp,
    email: updated.email,
  };
}
