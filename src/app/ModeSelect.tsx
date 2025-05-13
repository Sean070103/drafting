"use client";
import React from "react";

interface ModeSelectProps {
  onSelect: (mode: "ranked" | "tournament", side: "Blue" | "Red") => void;
}

export default function ModeSelect({ onSelect }: ModeSelectProps) {
  const [mode, setMode] = React.useState<"ranked" | "tournament">("ranked");
  const [side, setSide] = React.useState<"Blue" | "Red">("Blue");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-950 to-gray-900 text-white">
      <div className="bg-gray-900 rounded-lg shadow-lg p-8 flex flex-col gap-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Draft Mode Selection</h1>
        <div className="flex flex-col gap-4">
          <div>
            <span className="font-semibold">Draft Type:</span>
            <div className="flex gap-4 mt-2">
              <button
                className={`px-4 py-2 rounded font-bold ${mode === "ranked" ? "bg-black" : "bg-gray-700"}`}
                onClick={() => setMode("ranked")}
              >
                Ranked Draft (5v5)
              </button>
              <button
                className={`px-4 py-2 rounded font-bold ${mode === "tournament" ? "bg-black" : "bg-gray-700"}`}
                onClick={() => setMode("tournament")}
              >
                Tournament Draft (5v5)
              </button>
            </div>
          </div>
          <div>
            <span className="font-semibold">Pick Side:</span>
            <div className="flex gap-4 mt-2">
              <button
                className={`px-4 py-2 rounded font-bold ${side === "Blue" ? "bg-black" : "bg-gray-700"}`}
                onClick={() => setSide("Blue")}
              >
                Blue Side (First Pick)
              </button>
              <button
                className={`px-4 py-2 rounded font-bold ${side === "Red" ? "bg-gray-800" : "bg-gray-700"}`}
                onClick={() => setSide("Red")}
              >
                Red Side (Second Pick)
              </button>
            </div>
          </div>
          <button
            className="mt-6 px-6 py-3 bg-black rounded font-bold text-lg hover:bg-gray-800 transition"
            onClick={() => onSelect(mode, side)}
          >
            Start Draft
          </button>
        </div>
      </div>
    </div>
  );
}
