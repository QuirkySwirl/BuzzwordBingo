import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface BuzzwordListProps {
  meetingType: string;
}

export function BuzzwordList({ meetingType }: BuzzwordListProps) {
  // Fetch buzzwords for the selected meeting type
  const { data: buzzwords, isLoading } = useQuery<string[]>({
    queryKey: [`/api/buzzwords/${meetingType}`],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Display a subset of the buzzwords (first 9)
  const displayBuzzwords = buzzwords?.slice(0, 9) || [];

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">Common Buzzwords</h2>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {Array(9).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {displayBuzzwords.map((word, index) => (
              <div 
                key={index} 
                className="bg-background rounded px-3 py-2 text-secondary text-sm"
              >
                {word}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
