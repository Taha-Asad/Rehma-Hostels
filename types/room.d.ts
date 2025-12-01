import { JsonArray } from "@prisma/client/runtime/library";

declare global {
  interface Room {
    id: string;
    title: string;
    content: string;
    image: string | null;
    serviceList: string[];
    chips: JsonArray[];
    price: string;
    duration: string;
    capacity: number | null;
    size: string | null;
    availability: string | null;
    rating: number | null;
    reviews: number | null;
    description: string | null;
    amenities: string[];
  }
}

export {};
