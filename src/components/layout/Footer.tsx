import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0f0e0b]">
      <div className="mx-auto max-w-[1280px] px-8 py-16">
        <div className="grid gap-12 md:grid-cols-4 border-b border-white/10 pb-12">
          <div className="md:col-span-2">
            <span className="font-display text-[1.3rem] font-bold text-white/70">SEAM</span>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/40">
              A managed marketplace connecting customers with verified tailors around
              the world. Custom clothing, delivered to your door.
            </p>
          </div>
          <div>
            <p className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-white/40 mb-4">Platform</p>
            <ul className="space-y-3 text-sm text-white/50">
              <li><Link href="#how-it-works" className="hover:text-white/80 transition">How It Works</Link></li>
              <li><Link href="/tailors" className="hover:text-white/80 transition">Browse Tailors</Link></li>
              <li><Link href="#for-tailors" className="hover:text-white/80 transition">Join as Tailor</Link></li>
              <li><Link href="/auth/signup" className="hover:text-white/80 transition">Get Started</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-white/40 mb-4">Legal</p>
            <ul className="space-y-3 text-sm text-white/50">
              <li><Link href="#" className="hover:text-white/80 transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white/80 transition">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white/80 transition">Escrow Policy</Link></li>
              <li><Link href="#" className="hover:text-white/80 transition">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 flex justify-between items-center text-[0.72rem] text-white/30 tracking-[0.04em]">
          <span className="font-display text-[0.95rem] font-semibold text-white/50">SEAM</span>
          <span>&copy; {new Date().getFullYear()} SEAM. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
