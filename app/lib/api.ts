export const SUPABASE_URL = "https://fxybqucvtewkylctxjoj.supabase.co";
export const SUPABASE_KEY = "sb_publishable_drme4BfnnvyMX1gkyfCyrA_s9chTpSg";
export const SMS_API_URL = "https://europe-west1-sms-gateway-api-simpapp.cloudfunctions.net/api_v2_sms_send";

export const fetchAds = async () => {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/market_ads?select=*&order=created_at.desc`, {
      headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
    });
    return response.ok ? await response.json() : [];
  } catch (e) { return []; }
};
