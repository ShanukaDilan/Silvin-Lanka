import { getFeaturedTours } from "@/app/actions/tour";
import { FeaturedToursGrid } from "./FeaturedToursGrid";

export async function FeaturedTours() {
    const tours = await getFeaturedTours();

    return <FeaturedToursGrid tours={tours as any} />;
}
