import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-primary text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Corporate Buzzword Bingo</h3>
            <p className="text-gray-300 text-sm">Making meetings bearable since 2023</p>
          </div>
          <div className="flex space-x-4">
            <Link href="/about">
              <a className="text-gray-300 hover:text-white transition-colors">About</a>
            </Link>
            <Link href="/privacy">
              <a className="text-gray-300 hover:text-white transition-colors">Privacy</a>
            </Link>
            <Link href="/contact">
              <a className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
