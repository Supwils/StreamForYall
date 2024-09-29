import { getSearch } from "@/lib/search-service";
import { ResultCard } from "./result-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ResultCardSkeleton } from "../../(home)/_components/result-card";



interface ResultsProps { 
    term: string;
    
}

export const Results = async ({ term }: ResultsProps) => { 
    const data = await getSearch(term);
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">
                Results for term: {term}
            </h2>
            {data.length === 0 && (
                <div className="text-muted-foreground text-sm">
                     No results found
                </div>
            )}
            <div className="flex flex-col gap-y-4">
                {
                    data.map((result) => (
                        {data.map((result) => (
                            <ResultCard key={result.id} stream={result} />
                        ))}
                            <ResultCard key={result.id} stream={result} />
                        ))}
        </div>
    )
}

export const ResultSkeleton = () => { 
    return (
        <div>
            <Skeleton className="h-8 w-[290px] mb-4" />
            <div className="flex flex-col gap-y-4">
                {[...Array(4)].map((_, i) => (
                    <ResultCardSkeleton key={i} />
                ))}
            </div>
        </div>
    )
}