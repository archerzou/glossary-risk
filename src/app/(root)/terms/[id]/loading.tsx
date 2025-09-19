import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
            {/* Header section */}
            <header className="flex items-end justify-between">
                <Skeleton className="h-9 w-64 sm:w-96" /> {/* Term title */}
                <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-20" /> {/* Edit button */}
                    <Skeleton className="h-10 w-24" /> {/* Delete button */}
                </div>
            </header>

            {/* Horizontal rule */}
            <hr className="mt-6 border-border" />

            {/* Definition section */}
            <section className="mt-8">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-6 rounded" /> {/* BookOpen icon */}
                    <Skeleton className="h-6 w-24" /> {/* "Definition" text */}
                </div>

                {/* Definition content - multiple lines */}
                <div className="mt-4 space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[95%]" />
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[85%]" />
                    <Skeleton className="h-4 w-[92%]" />
                    <Skeleton className="h-4 w-[88%]" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </section>

            {/* Footer section */}
            <footer className="mt-16 border-t border-border pt-4">
                <Skeleton className="h-10 w-28" /> {/* Back button */}
            </footer>
        </div>
    );
}