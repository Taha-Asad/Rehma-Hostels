import "dotenv/config";
import { prisma } from "../src/lib/prisma";
// import type { Prisma } from "@prisma/client";

async function main() {
  await prisma.room.createMany({
    data: [
      {
        image: "/rooms/package1.jpg",
        title: "Standard Non-AC Room",
        content:
          "Comfortable accommodation with essential amenities for extended stays.",
        serviceList: [
          "Comfortable mattress",
          "Personal cubed storage area",
          "Reliable UPS power backup",
          "High-speed Wi-Fi",
          "Secure on-site parking",
          "Optional paid meal plan (Mess)",
          "Electricity billed separately for transparency",
        ],
        chips: [
          { icon: "Wallet", label: "Economy Stay", position: "bottom-left" },
        ],
        price: "PKR 10,000",
        duration: "Per Person / Per Month",
        capacity: 1,
        availability: "2 rooms available",
        rating: 4.5,
        reviews: 32,
        description:
          "Designed for simplicity and affordability, our non-AC rooms provide a quiet space with dependable power backup and strong connectivity.",
        amenities: [
          { icon: "Router", label: "Wi-Fi" },
          { icon: "DoorClosedLocked", label: "Cubed Storage" },
          { icon: "PlugZap", label: "UPS Backup" },
          { icon: "BedSingle", label: "Mattress" },
          { icon: "CircleParking", label: "Parking" },
          { icon: "Utensils", label: "Mess (Paid)" },
        ],
      },

      {
        image: "/rooms/package2.jpg",
        title: "Standard Room (With AC)",
        content:
          "Comfortable AC accommodation with essential amenities at affordable rates.",
        serviceList: [
          "Air Conditioning",
          "LED TV with Cable",
          "Hot Water (Geyser)",
          "Personal Cubed Storage",
          "High-speed Wi-Fi",
          "Secure Parking",
          "Single Bed",
          "Elevator Access",
          "Optional Paid Meal Plan (Mess)",
          "Electricity billed separately",
        ],
        chips: [
          { icon: "AirVent", label: "AC Room", position: "bottom-left" },
          { icon: "Star", label: "Featured", position: "top-right" },
        ],
        price: "PKR 13,000",
        duration: "Per Person / Per Month",
        capacity: 1,
        size: "Single Room",
        availability: "Available",
        rating: 4.3,
        reviews: 26,
        description:
          "A cozy, well-equipped room offering cool comfort and modern facilities.",
        amenities: [
          { icon: "AirVent", label: "Air Conditioner" },
          { icon: "MonitorPlay", label: "LED TV" },
          { icon: "Cable", label: "Cable Service" },
          { icon: "HotTub", label: "Geyser (Hot Water)" },
          { icon: "DoorClosedLocked", label: "Cubed Storage" },
          { icon: "Router", label: "Wi-Fi" },
          { icon: "CircleParking", label: "Parking" },
          { icon: "Bed", label: "Bed" },
          { icon: "Elevator", label: "Elevator" },
          { icon: "Utensils", label: "Mess (Paid)" },
        ],
      },

      {
        image: "/rooms/package3.jpg",
        title: "Luxury Stay",
        content:
          "Premium accommodation with modern amenities for a comfortable, elegant stay.",
        serviceList: [
          "Air Conditioning",
          "LED TV with Cable",
          "Hot Water (Geyser)",
          "Personal Cubed Storage",
          "High-speed Wi-Fi",
          "Secure Parking",
          "Double Bed",
          "Elevator Access",
          "Personal Fridge",
          "Included Electricity Bill",
          "Optional Paid Meal Plan (Mess)",
        ],
        chips: [{ icon: "Gem", label: "Luxury", position: "bottom-left" }],
        price: "PKR 5,000",
        duration: "Per Day",
        capacity: 2,
        size: "Double Room",
        availability: "Available",
        rating: 4.8,
        reviews: 42,
        description:
          "A high-end stay designed for comfort and style. Ideal for travelers who prefer convenience with all bills included.",
        amenities: [
          { icon: "AirVent", label: "Air Conditioner" },
          { icon: "MonitorPlay", label: "LED TV" },
          { icon: "Cable", label: "Cable Service" },
          { icon: "HotTub", label: "Geyser (Hot Water)" },
          { icon: "DoorClosedLocked", label: "Cubed Storage" },
          { icon: "Router", label: "Wi-Fi" },
          { icon: "CircleParking", label: "Parking" },
          { icon: "Bed", label: "Double Bed" },
          { icon: "Elevator", label: "Elevator" },
          { icon: "Refrigerator", label: "Fridge (Included)" },
          { icon: "Zap", label: "Electricity Included" },
          { icon: "Utensils", label: "Mess (Paid)" },
        ],
      },

      {
        image: "/rooms/package4.jpg",
        title: "Standard Daily Stay",
        content:
          "Affordable short-term stay with all basic amenities and utilities included.",
        serviceList: [
          "Air Conditioning",
          "LED TV with Cable",
          "Hot Water (Geyser)",
          "Personal Cubed Storage",
          "High-speed Wi-Fi",
          "Secure Parking",
          "Single Bed with Mattress",
          "Elevator Access",
          "Electricity Bill Included",
        ],
        chips: [
          {
            icon: "CalendarCheck",
            label: "Short Stay",
            position: "bottom-left",
          },
        ],
        price: "PKR 3,500",
        duration: "Per Day",
        capacity: 1,
        size: "Single Room",
        availability: "Available",
        rating: 4.1,
        reviews: 18,
        description:
          "Affordable daily accommodation perfect for quick stays or short visits.",
        amenities: [
          { icon: "AirVent", label: "Air Conditioner" },
          { icon: "MonitorPlay", label: "LED TV" },
          { icon: "Cable", label: "Cable Service" },
          { icon: "HotTub", label: "Geyser (Hot Water)" },
          { icon: "DoorClosedLocked", label: "Cubed Storage" },
          { icon: "Router", label: "Wi-Fi" },
          { icon: "CircleParking", label: "Parking" },
          { icon: "Bed", label: "Bed with Mattress" },
          { icon: "Elevator", label: "Elevator" },
          { icon: "Zap", label: "Electricity Included" },
        ],
      },
    ],
  });

  console.log("Rooms seeded successfully.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
