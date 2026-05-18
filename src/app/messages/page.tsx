"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type Message = {
  id: string;
  from: "customer" | "tailor";
  body: string;
  time: string;
  read?: boolean;
};

type Conversation = {
  id: string;
  tailorId: string;
  tailorName: string;
  orderId?: string;
  garment?: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  messages: Message[];
};

const conversations: Conversation[] = [
  {
    id: "conv-001",
    tailorId: "lagos-bespoke",
    tailorName: "Lagos Bespoke Studio",
    orderId: "ORD-001",
    garment: "2-Piece Suit",
    lastMessage: "We've started cutting the fabric today. Expect an update by Friday.",
    lastTime: "2h ago",
    unread: 1,
    messages: [
      { id: "m1", from: "customer", body: "Hi! I just submitted my enquiry for a 2-piece navy suit. Looking forward to hearing from you.", time: "12 May, 09:15" },
      { id: "m2", from: "tailor", body: "Thank you Jane! I've reviewed your brief — the navy wool-blend you've described is exactly what I work with. I'll have a quote to you within 24 hours.", time: "12 May, 11:30" },
      { id: "m3", from: "customer", body: "Wonderful. One question — will you be adding a ticket pocket? I'd love that if possible.", time: "12 May, 14:02" },
      { id: "m4", from: "tailor", body: "Absolutely, ticket pocket is no problem. I'll include it in the quote. I'll also add a working surgeon's cuff for the jacket.", time: "12 May, 15:45" },
      { id: "m5", from: "customer", body: "Perfect. Thank you so much — accepted your quote and payment is done.", time: "13 May, 10:20" },
      { id: "m6", from: "tailor", body: "Payment confirmed, thank you! We've started cutting the fabric today. Expect an update by Friday.", time: "14 May, 09:01", read: false },
    ],
  },
  {
    id: "conv-002",
    tailorId: "accra-threads",
    tailorName: "Accra Threads",
    orderId: "ORD-002",
    garment: "Kente Kaftan",
    lastMessage: "Your kaftan has been dispatched via DHL. Tracking: DHL-7734920011",
    lastTime: "14 May",
    unread: 0,
    messages: [
      { id: "m1", from: "customer", body: "Hello! I'd love a kente-print kaftan for a special occasion. Do you source your own kente fabric?", time: "2 May, 10:00" },
      { id: "m2", from: "tailor", body: "Yes, we source directly from Bonwire, the home of kente weaving in Ghana. Each piece is authentic hand-woven kente. What occasion is this for?", time: "2 May, 12:00" },
      { id: "m3", from: "customer", body: "It's for a wedding — I'm a guest. I'd like something elegant but not too formal.", time: "2 May, 13:30" },
      { id: "m4", from: "tailor", body: "I have the perfect design in mind. I'll send a quote shortly. Expected production: 10 days.", time: "2 May, 14:15" },
      { id: "m5", from: "tailor", body: "Your kaftan has been dispatched via DHL. Tracking: DHL-7734920011", time: "14 May, 08:00" },
    ],
  },
  {
    id: "conv-003",
    tailorId: "nairobi-tailors",
    tailorName: "Nairobi Tailors Co.",
    garment: "Wedding Dress",
    lastMessage: "Could you share some reference images for the silhouette you have in mind?",
    lastTime: "16 May",
    unread: 2,
    messages: [
      { id: "m1", from: "customer", body: "Hi! I'm interested in a bespoke wedding dress. I'd love a mermaid silhouette in ivory silk.", time: "15 May, 16:00" },
      { id: "m2", from: "tailor", body: "What a beautiful choice! Mermaid in ivory silk is a speciality of ours. Could you share some reference images for the silhouette you have in mind?", time: "16 May, 09:30", read: false },
      { id: "m3", from: "tailor", body: "Also — when is your wedding date? We need to factor in time for fittings if you're local, or photos for remote fitting.", time: "16 May, 09:31", read: false },
    ],
  },
];

export default function MessagesPage() {
  const [activeId, setActiveId] = useState(conversations[0].id);
  const [input, setInput] = useState("");
  const [convos, setConvos] = useState(conversations);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const active = convos.find((c) => c.id === activeId)!;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeId, active.messages.length]);

  function sendMessage() {
    const text = input.trim();
    if (!text) return;
    setConvos((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              lastMessage: text,
              lastTime: "Just now",
              messages: [...c.messages, { id: Date.now().toString(), from: "customer", body: text, time: "Now" }],
            }
          : c
      )
    );
    setInput("");
  }

  return (
    <div className="bg-[#fdfcf9] min-h-screen">
      {/* Header */}
      <div className="border-b border-[#e6e3da] bg-white px-8 py-4">
        <div className="mx-auto max-w-[1280px] flex items-center justify-between">
          <div>
            <p className="text-[0.62rem] font-bold tracking-[0.12em] uppercase text-[#8b6914]">Inbox</p>
            <p className="text-[0.9rem] font-semibold text-[#0f0e0b]">Messages</p>
          </div>
          <Link href="/customer/dashboard" className="text-[0.75rem] text-[#6b6757] hover:text-[#1c1b17] transition">
            ← Dashboard
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-0 border border-[#e6e3da] rounded-[6px] overflow-hidden bg-white" style={{ height: "calc(100vh - 180px)", minHeight: "560px" }}>

          {/* Conversation list */}
          <div className="border-r border-[#e6e3da] flex flex-col overflow-hidden">
            <div className="px-5 py-4 border-b border-[#e6e3da] bg-[#f7f5f0]">
              <p className="text-[0.62rem] font-bold tracking-[0.12em] uppercase text-[#6b6757]">Conversations</p>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-[#e6e3da]">
              {convos.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={`w-full text-left px-5 py-4 transition-colors ${activeId === c.id ? "bg-[#faf4e1]" : "hover:bg-[#fdfcf9]"}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-[#0f0e0b] flex items-center justify-center text-white text-[0.72rem] font-bold shrink-0">
                        {c.tailorName[0]}
                      </div>
                      <p className="text-[0.85rem] font-semibold text-[#0f0e0b] leading-tight">{c.tailorName}</p>
                    </div>
                    <span className="text-[0.65rem] text-[#9c9886] shrink-0">{c.lastTime}</span>
                  </div>
                  {c.garment && (
                    <p className="text-[0.7rem] text-[#8b6914] font-medium ml-10 mb-1">{c.garment}{c.orderId ? ` · ${c.orderId}` : ""}</p>
                  )}
                  <div className="flex items-center justify-between gap-2 ml-10">
                    <p className="text-[0.78rem] text-[#6b6757] line-clamp-1 flex-1">{c.lastMessage}</p>
                    {c.unread > 0 && (
                      <span className="h-4 w-4 bg-[#8b6914] text-white text-[0.6rem] font-bold rounded-full flex items-center justify-center shrink-0">
                        {c.unread}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Message thread */}
          <div className="flex flex-col overflow-hidden">
            {/* Thread header */}
            <div className="px-6 py-4 border-b border-[#e6e3da] bg-white flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-[#0f0e0b] flex items-center justify-center text-white text-[0.78rem] font-bold">
                  {active.tailorName[0]}
                </div>
                <div>
                  <p className="text-[0.88rem] font-semibold text-[#0f0e0b]">{active.tailorName}</p>
                  {active.garment && (
                    <p className="text-[0.72rem] text-[#8b6914]">{active.garment}{active.orderId ? ` · ${active.orderId}` : ""}</p>
                  )}
                </div>
              </div>
              {active.orderId && (
                <Link
                  href={`/orders/${active.orderId}`}
                  className="shrink-0 border border-[#d0ccbf] text-[#6b6757] text-[0.68rem] font-semibold tracking-[0.06em] uppercase px-3 py-1.5 rounded-[4px] hover:bg-[#f7f5f0] transition"
                >
                  View Order →
                </Link>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
              {active.messages.map((msg) => {
                const isMe = msg.from === "customer";
                return (
                  <div key={msg.id} className={`flex gap-3 ${isMe ? "flex-row-reverse" : ""}`}>
                    <div className={`h-7 w-7 rounded-full flex items-center justify-center text-[0.65rem] font-bold shrink-0 mt-0.5 ${
                      isMe ? "bg-[#8b6914] text-white" : "bg-[#0f0e0b] text-white"
                    }`}>
                      {isMe ? "J" : active.tailorName[0]}
                    </div>
                    <div className={`max-w-[72%] ${isMe ? "items-end" : "items-start"} flex flex-col gap-1`}>
                      <div className={`px-4 py-3 rounded-[6px] text-[0.88rem] leading-[1.6] ${
                        isMe
                          ? "bg-[#0f0e0b] text-white rounded-tr-[2px]"
                          : "bg-[#f7f5f0] text-[#1c1b17] border border-[#e6e3da] rounded-tl-[2px]"
                      }`}>
                        {msg.body}
                      </div>
                      <span className="text-[0.68rem] text-[#9c9886] px-1">{msg.time}</span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Compose */}
            <div className="border-t border-[#e6e3da] px-4 py-4 bg-white shrink-0">
              <div className="flex gap-3 items-end">
                <textarea
                  rows={2}
                  placeholder="Write a message…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }}}
                  className="flex-1 px-4 py-3 border border-[#d0ccbf] rounded-[6px] text-[0.9rem] bg-[#fdfcf9] text-[#1c1b17] placeholder:text-[#9c9886] focus:outline-none focus:border-[#8b6914] focus:ring-2 focus:ring-[#8b6914]/10 transition resize-none"
                />
                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="bg-[#0f0e0b] text-white text-[0.72rem] font-semibold tracking-[0.06em] uppercase px-5 py-3 rounded-[6px] hover:opacity-80 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                >
                  Send
                </button>
              </div>
              <p className="mt-2 text-[0.68rem] text-[#9c9886]">Enter to send · Shift+Enter for new line</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
