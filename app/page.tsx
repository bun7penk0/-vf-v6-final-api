"use client";
import { useState, useRef } from "react";

const VOICES = [
  {
    "id": "21m00Tcm4TlvDq8ikWAM",
    "name": "พ่อสมชาย",
    "label": "พ่อ ใจดี ทุ้มต่ำ",
    "f0": "120Hz",
    "text": "สวัสดีครับ ผมพ่อสมชาย พ่อ ใจดี ทุ้มต่ำ",
    "gender": "Adam"
  },
  {
    "id": "pNInz6obpgDQGcFmaJgB",
    "name": "แม่ริน",
    "label": "แม่ อบอุ่น นุ่มนวล",
    "f0": "120Hz",
    "text": "สวัสดีครับ ผมแม่ริน แม่ อบอุ่น นุ่มนวล",
    "gender": "Bella"
  },
  {
    "id": "EXAVITQu4vr4xnSDxMaL",
    "name": "ฟ้า",
    "label": "วัยรุ่นหญิง สดใส",
    "f0": "120Hz",
    "text": "สวัสดีครับ ผมฟ้า วัยรุ่นหญิง สดใส",
    "gender": "Bella"
  },
  {
    "id": "ErXwobaYiN019PkySvjV",
    "name": "ต้น",
    "label": "วัยรุ่นชาย ซนๆ",
    "f0": "120Hz",
    "text": "สวัสดีครับ ผมต้น วัยรุ่นชาย ซนๆ",
    "gender": "Antoni"
  },
  {
    "id": "MF3mGyEYCl7XYWbV9V6O",
    "name": "ยายมะลิ",
    "label": "ยาย ช้า อบอุ่น",
    "f0": "120Hz",
    "text": "สวัสดีครับ ผมยายมะลิ ยาย ช้า อบอุ่น",
    "gender": "Elli"
  },
  {
    "id": "TxGEqnHWrfWFTfGW9XjX",
    "name": "นนท์",
    "label": "เด็กชาย 8 ขวบ",
    "f0": "120Hz",
    "text": "สวัสดีครับ ผมนนท์ เด็กชาย 8 ขวบ",
    "gender": "Josh"
  },
  {
    "id": "VR6AewLTigWG4xSOukaG",
    "name": "ครูใหญ่",
    "label": "ครู เข้ม ภูมิฐาน",
    "f0": "120Hz",
    "text": "สวัสดีครับ ผมครูใหญ่ ครู เข้ม ภูมิฐาน",
    "gender": "Arnold"
  },
  {
    "id": "AZnzlk1XvdvUeBnXmlld",
    "name": "ป้าจัน",
    "label": "ป้าข้างบ้าน เม้าท์เก่ง",
    "f0": "120Hz",
    "text": "สวัสดีครับ ผมป้าจัน ป้าข้างบ้าน เม้าท์เก่ง",
    "gender": "Domi"
  },
  {
    "id": "yoZ06aMxZJJ28mfd3POQ",
    "name": "ลุงดำ",
    "label": "ลุง ช่าง แหบ",
    "f0": "120Hz",
    "text": "สวัสดีครับ ผมลุงดำ ลุง ช่าง แหบ",
    "gender": "Sam"
  },
  {
    "id": "pFZP5JQG7iQjIQuC4Bku",
    "name": "ใบข้าว",
    "label": "สาวอีสาน หวาน",
    "f0": "120Hz",
    "text": "สวัสดีครับ ผมใบข้าว สาวอีสาน หวาน",
    "gender": "Lily"
  },
  {
    "id": "2EiwWnXFnvU5JabPnv8n",
    "name": "โต้ง",
    "label": "เพื่อนซี้ กวนๆ",
    "f0": "120Hz",
    "text": "สวัสดีครับ ผมโต้ง เพื่อนซี้ กวนๆ",
    "gender": "Clyde"
  },
  {
    "id": "ThT5KcBeYPX3keUQqHPh",
    "name": "ดาว",
    "label": "ดารา เซ็กซี่",
    "f0": "120Hz",
    "text": "สวัสดีครับ ผมดาว ดารา เซ็กซี่",
    "gender": "Dorothy"
  },
  {
    "id": "N2lVS1w4EtoT3dr4eOWO",
    "name": "แก้ว",
    "label": "สาวออฟฟิศ มั่นใจ",
    "f0": "120Hz",
    "text": "สวัสดีครับ ผมแก้ว สาวออฟฟิศ มั่นใจ",
    "gender": "Callum"
  },
  {
    "id": "onwK4e9ZLuTAKqWW03F9",
    "name": "โจ้",
    "label": "หนุ่มหล่อ เท่",
    "f0": "120Hz",
    "text": "สวัสดีครับ ผมโจ้ หนุ่มหล่อ เท่",
    "gender": "Daniel"
  },
  {
    "id": "XrExE9yKIg1WjnnlVkGX",
    "name": "มิ้น",
    "label": "เน็ตไอดอล แบ๊ว",
    "f0": "120Hz",
    "text": "สวัสดีครับ ผมมิ้น เน็ตไอดอล แบ๊ว",
    "gender": "Matilda"
  },
  {
    "id": "jBpfuIE2acCO8z3wKNLl",
    "name": "เอก",
    "label": "วิศวะ เนิร์ด",
    "f0": "120Hz",
    "text": "สวัสดีครับ ผมเอก วิศวะ เนิร์ด",
    "gender": "Gigi"
  },
  {
    "id": "jsCqE6D7z4v342a5cZQa",
    "name": "ปู่คำ",
    "label": "ปู่ ภูมิปัญญา",
    "f0": "120Hz",
    "text": "สวัสดีครับ ผมปู่คำ ปู่ ภูมิปัญญา",
    "gender": "Freya"
  },
  {
    "id": "GBv7mTt0l3Ys3p8zX8mK",
    "name": "อ้อม",
    "label": "พี่สาว ดุแต่ห่วง",
    "f0": "120Hz",
    "text": "สวัสดีครับ ผมอ้อม พี่สาว ดุแต่ห่วง",
    "gender": "Thomas"
  },
  {
    "id": "oWAxZDx7w5V3cTq3uhLG",
    "name": "วิน",
    "label": "วินมอไซค์ เร็ว",
    "f0": "120Hz",
    "text": "สวัสดีครับ ผมวิน วินมอไซค์ เร็ว",
    "gender": "Nicole"
  }
];

export default function Page() {
  const [selected, setSelected] = useState(VOICES[0]);
  const [text, setText] = useState(VOICES[0].text);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);

  async function handleTTS() {
    setLoading(true);
    setError("");
    setAudioUrl("");
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voiceId: selected.id, text })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("audio/")) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "INVALID_AUDIO_TYPE: " + contentType);
      }

      const blob = await res.blob();
      if (blob.size < 1000) throw new Error("EMPTY_AUDIO: size " + blob.size);
      if (!blob.type.includes("audio")) throw new Error("NOT_AUDIO_BLOB: " + blob.type);

      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setTimeout(() => audioRef.current?.play(), 100);
    } catch (e: any) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20, fontFamily: "system-ui" }}>
      <h1>VF V6.0 FULL - 19 Voices + Real ElevenLabs API</h1>
      <p>เว็บไซต์หลัก: https://sweet-khapse-88d4a1.netlify.app/ (อ้างอิง)</p>
      <p>Backend: /api/tts → ElevenLabs Text-to-Speech → audio/mpeg</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10, marginTop: 20 }}>
        {VOICES.map(v => (
          <button
            key={v.id}
            onClick={() => { setSelected(v); setText(v.text); }}
            style={{
              padding: 10,
              border: selected.id === v.id ? "2px solid #0070f3" : "1px solid #ccc",
              background: selected.id === v.id ? "#e6f0ff" : "white",
              borderRadius: 8,
              cursor: "pointer"
            }}
          >
            <strong>{v.name}</strong><br />
            <small>{v.label}</small><br />
            <small>{v.id.slice(0,8)}...</small>
          </button>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <label>ตัวละครที่เลือก: <strong>{selected.name} ({selected.id})</strong></label><br />
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          style={{ width: "100%", height: 80, marginTop: 10, padding: 10 }}
          placeholder="พิมพ์ข้อความภาษาไทย"
        />
      </div>

      <button
        onClick={handleTTS}
        disabled={loading || !text.trim()}
        style={{
          marginTop: 15,
          padding: "12px 24px",
          background: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.6 : 1
        }}
      >
        {loading ? "⏳ กำลังสร้างเสียง..." : "🎙️ สร้างเสียงไทยจริงผ่าน Backend /api/tts"}
      </button>

      {error && (
        <div style={{ marginTop: 15, padding: 12, background: "#fee", border: "1px solid #fcc", borderRadius: 8, color: "#c00" }}>
          <strong>Error:</strong> {error}<br />
          {error.includes("ELEVENLABS_API_KEY_MISSING") && <span>→ ไปตั้งค่า Environment Variables ใน Netlify: ELEVENLABS_API_KEY</span>}
        </div>
      )}

      {audioUrl && (
        <div style={{ marginTop: 15 }}>
          <audio ref={audioRef} controls src={audioUrl} style={{ width: "100%" }} />
          <p>✅ ได้ audio/mpeg ขนาด {/* will show after blob */} พร้อมเล่นต่อเนื่อง</p>
        </div>
      )}

      <div style={{ marginTop: 30, fontSize: 12, color: "#666" }}>
        <h3>ระบบล็อกไว้:</h3>
        <ul>
          <li>19 ตัวละครครบ Voice ID ไม่ซ้ำ</li>
          <li>เรียก Backend /api/tts เท่านั้น ห้ามเรียก ElevenLabs ตรงจาก Browser</li>
          <li>API Key อยู่ใน Environment Variables เท่านั้น</li>
          <li>ตรวจ content-type audio/mpeg และขนาดไฟล์ก่อนเล่น</li>
          <li>ห้ามใช้เสียงบี๊บ Web Speech API แทน</li>
        </ul>
      </div>
    </div>
  );
}
