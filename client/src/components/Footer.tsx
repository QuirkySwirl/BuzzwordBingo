import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="glass-card bg-indigo-900/30 text-white py-6 mt-12 border-t border-indigo-500/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">Corporate Buzzword Bingo</h3>
            <p className="text-indigo-200 text-sm">Making meetings <span className="line-through">bearable</span> hilarious since 2023</p>
          </div>
          <div className="flex space-x-4">
            <Link href="/about">
              <span className="text-indigo-200 hover:text-white transition-colors cursor-pointer">About</span>
            </Link>
            <Link href="/privacy">
              <span className="text-indigo-200 hover:text-white transition-colors cursor-pointer">Privacy</span>
            </Link>
            <Link href="/contact">
              <span className="text-indigo-200 hover:text-white transition-colors cursor-pointer">Contact</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
