import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  const rooms = [
    {
      image: "/uploads/package1.jpg",
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
        { icon: "wallet", label: "Economy Stay", position: "bottom-left" },
      ],
      price: "PKR 10,000",
      duration: "Per Person / Per Month",
      capacity: 1,
      availability: "2 rooms available",
      rating: 4.5,
      size: "Single Room",
      reviews: 32,
      description:
        "Designed for simplicity and affordability, our non-AC rooms provide a quiet space with dependable power backup and strong connectivity.",
      amenities: [
        "Wi-Fi",
        "Cubed Storage",
        "UPS Backup",
        "Mattress",
        "Parking",
        "Mess (Paid)",
      ],
    },
    {
      image: "/uploads/package2.jpg",
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
        { icon: "air-vent", label: "AC Room", position: "bottom-left" },
        { icon: "star", label: "Featured", position: "top-right" },
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
        "Air Conditioner",
        "LED TV",
        "Cable Service",
        "Geyser (Hot Water)",
        "Cubed Storage",
        "Wi-Fi",
        "Parking",
        "Bed",
        "Elevator",
        "Mess (Paid)",
      ],
    },
    {
      image: "/uploads/package3.jpg",
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
      chips: [{ icon: "gem", label: "Luxury", position: "bottom-left" }],
      price: "PKR 5,000",
      duration: "Per Day",
      capacity: 2,
      size: "Double Room",
      availability: "Available",
      rating: 4.8,
      reviews: 42,
      description:
        "A high-end stay designed for comfort and style. Includes all bills.",
      amenities: [
        "Air Conditioner",
        "LED TV",
        "Cable Service",
        "Geyser (Hot Water)",
        "Cubed Storage",
        "Wi-Fi",
        "Parking",
        "Double Bed",
        "Elevator",
        "Fridge (Included)",
        "Electricity Included",
        "Mess (Paid)",
      ],
    },
    {
      image: "/uploads/package4.jpg",
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
          icon: "calendar-check",
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
      description: "Affordable daily accommodation perfect for short visits.",
      amenities: [
        "Air Conditioner",
        "LED TV",
        "Cable Service",
        "Geyser (Hot Water)",
        "Cubed Storage",
        "Wi-Fi",
        "Parking",
        "Bed with Mattress",
        "Elevator",
        "Electricity Included",
      ],
    },
  ];

  // Use create in a loop to handle Json[] fields
  for (const room of rooms) {
    await prisma.room.create({
      data: room,
    });
  }

  console.log("Rooms and admin seeded successfully!");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
