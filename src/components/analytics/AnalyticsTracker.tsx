"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackVisit } from "@/app/actions/analytics";

export function AnalyticsTracker() {
    const pathname = usePathname();

    useEffect(() => {
        // Simple debounce or just fire on mount/change
        if (pathname) {
            trackVisit(pathname);
        }
    }, [pathname]);

    return null;
}
