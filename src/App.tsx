import React, { useState, useMemo } from 'react';
import { Search, Copy, Check } from 'lucide-react';

const emojiData = [
  { emoji: "💯", name: "100", keywords: "hundred, points, symbol, wow, win, perfect, parties" },
  { emoji: "🔢", name: "1234", keywords: "input, symbol, numbers, count, math" },
  { emoji: "😺", name: "Grinning Cat", keywords: "cat, animal, smile, happy" },
  { emoji: "🚀", name: "Rocket", keywords: "space, launch, fast" },
  { emoji: "🔥", name: "Fire", keywords: "hot, flame, lit" },
  { emoji: "❤️", name: "Red Heart", keywords: "love, heart" },
  { emoji: "👍", name: "Thumbs Up", keywords: "good, yes" },
  { emoji: "🎉", name: "Party Popper", keywords: "celebration, party" },
  { emoji: "🌟", name: "Glowing Star", keywords: "star, shine" },
  { emoji: "🍕", name: "Pizza", keywords: "food" },
  { emoji: "🐱", name: "Cat", keywords: "cat, animal" },
  { emoji: "🐶", name: "Dog", keywords: "dog, animal" },
  { emoji: "🍔", name: "Burger", keywords: "food" },
  { emoji: "☕", name: "Coffee", keywords: "drink" },
  { emoji: "📱", name: "Phone", keywords: "mobile" },
  { emoji: "💻", name: "Laptop", keywords: "computer" },
  { emoji: "🎮", name: "Game", keywords: "gaming" },
  { emoji: "✨", name: "Sparkles", keywords: "magic" },
  { emoji: "😎", name: "Cool", keywords: "sunglasses" },
  { emoji: "🤩", name: "Star Struck", keywords: "amazed" },
];

export default function App() {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search) return emojiData;
    const q = search.toLowerCase();
    return emojiData.filter(e => 
      e.emoji.includes(q) || 
      e.name.toLowerCase().includes(q) || 
      e.keywords.toLowerCase().includes(q)
    );
  }, [search]);

  const copy = (emoji: string) => {
    navigator.clipboard.writeText(emoji);
    setCopied(emoji);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="relative overflow-hidden bg-sky-700 pb-32 text-white">
        <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.24),_transparent_50%)]" />
        <div className="relative mx-auto max-w-5xl px-4 pt-24 text-center">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">Emoji Finder</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-100/85 sm:text-lg">
            Find emoji by keywords
          </p>
        </div>
      </div>

      <div className="relative -mt-10 px-4">
        <div className="mx-auto max-w-3xl rounded-[32px] bg-white p-4 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-200">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
            <input
              type="text"
              placeholder="Placeholder"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-[28px] border border-slate-200 bg-white py-4 pl-14 pr-5 text-base text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            />
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((item) => (
            <button
              key={item.emoji}
              type="button"
              onClick={() => copy(item.emoji)}
              className="group overflow-hidden rounded-[28px] bg-white p-8 text-left shadow-xl shadow-slate-900/5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-[24px] bg-slate-50 text-5xl shadow-sm shadow-slate-900/5">
                {item.emoji}
              </div>
              <div className="mt-6">
                <h3 className="text-2xl font-semibold text-slate-900">{item.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">{item.keywords}</p>
              </div>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 transition group-hover:bg-sky-100">
                {copied === item.emoji ? (
                  <>
                    <Check size={16} />
                    Скопировано!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Копировать
                  </>
                )}
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 rounded-[28px] border border-dashed border-slate-300 bg-white/80 p-12 text-center text-slate-500 shadow-sm">
            <p className="text-xl font-semibold">Emoji not found 😢</p>
            <p className="mt-3 text-sm">Try another search</p>
          </div>
        )}
      </main>
    </div>
  );
}
