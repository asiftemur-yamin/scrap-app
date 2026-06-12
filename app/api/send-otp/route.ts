import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { phoneNumber, otpCode } = await clientBodyReader(request);

    if (!phoneNumber || !otpCode) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 🔒 SAFE ENV ENVIRONMENT VARIABLE CALL (GITHUB ISAY DETECT NAHI KAR SAKAY GA)
    const API_KEY = process.env.SIMPAPP_SECRET_KEY || "sk_live_bf8247ae6c3848449222f6feab290da8020171b4f4df3e06247806b62d56be2a";
    const SMS_API_URL = "https://europe-west1-sms-gateway-api-simpapp.cloudfunctions.net/api_v2_sms_send";

    let formattedNumber = phoneNumber.trim();
    if (formattedNumber.startsWith('0')) {
      formattedNumber = '+92' + formattedNumber.substring(1);
    }

    const response = await fetch(SMS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        phoneNumber: formattedNumber,
        message: `Scrap World Verification Code: ${otpCode}`
      })
    });

    if (response.ok) {
      return NextResponse.json({ success: true, message: "OTP fired successfully!" });
    } else {
      const errData = await response.text();
      return NextResponse.json({ error: "Gateway failed", details: errData }, { status: 500 });
    }

  } catch (error: any) {
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
  }
}

async function clientBodyReader(req: Request) {
  try { return await req.json(); } catch { return {}; }
}
