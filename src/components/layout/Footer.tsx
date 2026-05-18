import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <span className="text-xl font-semibold text-white">SEAM</span>
            <p className="mt-3 max-w-xs text-sm leading-6 text-slate-400">
              A managed marketplace connecting customers with verified tailors around the world.
              Custom clothing, delivered to your door.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Platform</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li><Link href="#how-it-works" className="hover:text-white transition">How It Works</Link></li>
              <li><Link href="/tailors" className="hover:text-white transition">Browse Tailors</Link></li>
              <li><Link href="#for-tailors" className="hover:text-white transition">Join as Tailor</Link></li>
              <li><Link href="/auth/signup" className="hover:text-white transition">Get Started</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Legal</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition">Escrow Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-8 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} SEAM. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
