export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { voiceId, text } = await request.json();
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "ELEVENLABS_API_KEY_MISSING" },
        { status: 500 }
      );
    }

    if (
      typeof voiceId !== "string" ||
      !voiceId.trim() ||
      typeof text !== "string" ||
      !text.trim()
    ) {
      return Response.json(
        { error: "VOICE_ID_OR_TEXT_MISSING" },
        { status: 400 }
      );
    }

    const upstream = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
          "Accept": "audio/mpeg"
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.65,
            similarity_boost: 0.75,
            style: 0.45,
            use_speaker_boost: true
          }
        })
      }
    );

    if (!upstream.ok) {
      const detail = await upstream.text();
      return Response.json(
        {
          error: "ELEVENLABS_TTS_FAILED",
          status: upstream.status,
          detail: detail.slice(0, 1500)
        },
        { status: 502 }
      );
    }

    const arrayBuffer = await upstream.arrayBuffer();

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store"
      }
    });
  } catch (e) {
    return Response.json(
      { error: "BACKEND_FAILED", detail: String(e) },
      { status: 502 }
    );
  }
}
