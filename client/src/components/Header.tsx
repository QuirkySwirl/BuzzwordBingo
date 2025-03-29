import { Button } from "@/components/ui/button";

export function Header() {
  const handleDonateClick = () => {
    window.open("https://donate.example.com", "_blank");
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <svg className="h-8 w-8 text-accent" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 15.5h-2V13h2v5.5zm0-7h-2v-2h2v2zm0-4h-2V5h2v2.5zm6 11.5h-4V13h4v5.5zm0-7h-4v-2h4v2zm0-4h-4V5h4v2.5z" />
          </svg>
          <h1 className="ml-2 text-xl font-semibold text-primary">Corporate Buzzword Bingo</h1>
        </div>
        <Button 
          className="bg-accent hover:bg-accent/90 text-white"
          size="sm"
          onClick={handleDonateClick}
        >
          Support Us
        </Button>
      </div>
    </header>
  );
}
