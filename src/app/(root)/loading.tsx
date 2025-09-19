import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-6">
            {/* SearchBar skeleton */}
            <div className="rounded-lg border p-4 bg-card">
                <div className="flex items-center gap-2">
                    <div className="relative w-full">
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <Skeleton className="h-10 w-10 shrink-0" /> {/* Clear button */}
                    <Skeleton className="h-10 w-24 shrink-0" /> {/* Show All button */}
                </div>
            </div>

            {/* AlphabetNav skeleton - 26 letter buttons */}
            <div className="rounded-lg border p-2 bg-card overflow-x-auto">
                <div className="flex items-center gap-1 min-w-[640px] md:min-w-0">
                    {Array.from({ length: 26 }).map((_, i) => (
                        <Skeleton key={i} className="h-8 w-9 rounded-md shrink-0" />
                    ))}
                </div>
            </div>

            {/* GlossaryList skeleton - grouped terms */}
            <div className="space-y-8">
                {/* Simulate 3-4 letter groups */}
                {Array.from({ length: 3 }).map((_, groupIndex) => (
                    <section key={groupIndex} className="space-y-4">
                        {/* Letter header */}
                        <div className="border-b pb-2">
                            <Skeleton className="h-8 w-8" />
                        </div>

                        {/* Term cards for this letter */}
                        <div className="grid gap-6">
                            {Array.from({ length: 2 + groupIndex }).map((_, cardIndex) => (
                                <div
                                    key={cardIndex}
                                    className="rounded-2xl border p-6 space-y-3"
                                >
                                    <Skeleton className="h-6 w-1/3" /> {/* Term title */}
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-5/6" />
                                    <Skeleton className="h-4 w-4/6" />
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}