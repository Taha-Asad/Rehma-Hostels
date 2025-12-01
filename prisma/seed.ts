import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  // const rooms = [
  //   {
  //     image: "/uploads/package1.jpg",
  //     title: "Standard Non-AC Room",
  //     content:
  //       "Comfortable accommodation with essential amenities for extended stays.",
  //     serviceList: [
  //       "Comfortable mattress",
  //       "Personal cubed storage area",
  //       "Reliable UPS power backup",
  //       "High-speed Wi-Fi",
  //       "Secure on-site parking",
  //       "Optional paid meal plan (Mess)",
  //       "Electricity billed separately for transparency",
  //     ],
  //     chips: [
  //       { icon: "wallet", label: "Economy Stay", position: "bottom-left" },
  //     ],
  //     price: "PKR 10,000",
  //     duration: "Per Person / Per Month",
  //     capacity: 1,
  //     availability: "2 rooms available",
  //     rating: 4.5,
  //     size: "Single Room",
  //     reviews: 32,
  //     description:
  //       "Designed for simplicity and affordability, our non-AC rooms provide a quiet space with dependable power backup and strong connectivity.",
  //     amenities: [
  //       "Wi-Fi",
  //       "Cubed Storage",
  //       "UPS Backup",
  //       "Mattress",
  //       "Parking",
  //       "Mess (Paid)",
  //     ],
  //   },
  //   {
  //     image: "/uploads/package2.jpg",
  //     title: "Standard Room (With AC)",
  //     content:
  //       "Comfortable AC accommodation with essential amenities at affordable rates.",
  //     serviceList: [
  //       "Air Conditioning",
  //       "LED TV with Cable",
  //       "Hot Water (Geyser)",
  //       "Personal Cubed Storage",
  //       "High-speed Wi-Fi",
  //       "Secure Parking",
  //       "Single Bed",
  //       "Elevator Access",
  //       "Optional Paid Meal Plan (Mess)",
  //       "Electricity billed separately",
  //     ],
  //     chips: [
  //       { icon: "air-vent", label: "AC Room", position: "bottom-left" },
  //       { icon: "star", label: "Featured", position: "top-right" },
  //     ],
  //     price: "PKR 13,000",
  //     duration: "Per Person / Per Month",
  //     capacity: 1,
  //     size: "Single Room",
  //     availability: "Available",
  //     rating: 4.3,
  //     reviews: 26,
  //     description:
  //       "A cozy, well-equipped room offering cool comfort and modern facilities.",
  //     amenities: [
  //       "Air Conditioner",
  //       "LED TV",
  //       "Cable Service",
  //       "Geyser (Hot Water)",
  //       "Cubed Storage",
  //       "Wi-Fi",
  //       "Parking",
  //       "Bed",
  //       "Elevator",
  //       "Mess (Paid)",
  //     ],
  //   },
  //   {
  //     image: "/uploads/package3.jpg",
  //     title: "Luxury Stay",
  //     content:
  //       "Premium accommodation with modern amenities for a comfortable, elegant stay.",
  //     serviceList: [
  //       "Air Conditioning",
  //       "LED TV with Cable",
  //       "Hot Water (Geyser)",
  //       "Personal Cubed Storage",
  //       "High-speed Wi-Fi",
  //       "Secure Parking",
  //       "Double Bed",
  //       "Elevator Access",
  //       "Personal Fridge",
  //       "Included Electricity Bill",
  //       "Optional Paid Meal Plan (Mess)",
  //     ],
  //     chips: [{ icon: "gem", label: "Luxury", position: "bottom-left" }],
  //     price: "PKR 5,000",
  //     duration: "Per Day",
  //     capacity: 2,
  //     size: "Double Room",
  //     availability: "Available",
  //     rating: 4.8,
  //     reviews: 42,
  //     description:
  //       "A high-end stay designed for comfort and style. Includes all bills.",
  //     amenities: [
  //       "Air Conditioner",
  //       "LED TV",
  //       "Cable Service",
  //       "Geyser (Hot Water)",
  //       "Cubed Storage",
  //       "Wi-Fi",
  //       "Parking",
  //       "Double Bed",
  //       "Elevator",
  //       "Fridge (Included)",
  //       "Electricity Included",
  //       "Mess (Paid)",
  //     ],
  //   },
  //   {
  //     image: "/uploads/package4.jpg",
  //     title: "Standard Daily Stay",
  //     content:
  //       "Affordable short-term stay with all basic amenities and utilities included.",
  //     serviceList: [
  //       "Air Conditioning",
  //       "LED TV with Cable",
  //       "Hot Water (Geyser)",
  //       "Personal Cubed Storage",
  //       "High-speed Wi-Fi",
  //       "Secure Parking",
  //       "Single Bed with Mattress",
  //       "Elevator Access",
  //       "Electricity Bill Included",
  //     ],
  //     chips: [
  //       {
  //         icon: "calendar-check",
  //         label: "Short Stay",
  //         position: "bottom-left",
  //       },
  //     ],
  //     price: "PKR 3,500",
  //     duration: "Per Day",
  //     capacity: 1,
  //     size: "Single Room",
  //     availability: "Available",
  //     rating: 4.1,
  //     reviews: 18,
  //     description: "Affordable daily accommodation perfect for short visits.",
  //     amenities: [
  //       "Air Conditioner",
  //       "LED TV",
  //       "Cable Service",
  //       "Geyser (Hot Water)",
  //       "Cubed Storage",
  //       "Wi-Fi",
  //       "Parking",
  //       "Bed with Mattress",
  //       "Elevator",
  //       "Electricity Included",
  //     ],
  //   },
  // ];
  const userId = "cmik4ip1u0000cci0z47etdlq";
  const seedPosts = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format",
      title: "Premium Rooms Renovated",
      content:
        "Our newly renovated premium rooms are now available for working professionals seeking a quieter and more modern living space.",
      fullContent: `
      <p>The hostel has completed the renovation of its premium rooms, now featuring improved lighting, ergonomic study desks, sound-insulated walls, and upgraded bedding.</p>

      <h3>Key Improvements</h3>
      <ul>
        <li>Soundproofing for improved sleep quality</li>
        <li>New air-conditioning units with energy-saving mode</li>
        <li>Ergonomic work desk with LED white lighting</li>
        <li>High-speed Wi-Fi coverage across the entire block</li>
      </ul>

      <p>These rooms are ideal for remote workers, night-shift employees, and professionals who simply want a peaceful environment after long work hours.</p>
    `,
      date: new Date("2025-12-01"), // ✅ correct
      authorId: userId,
      readTime: "4 min read",
      category: "Facilities",
      chips: [{ label: "Premium Upgrade", position: "top-right" }],
    },

    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=1200&auto=format",
      title: "Laundry Service Revamped",
      content:
        "A faster, more convenient laundry service is now operational with extended hours to support busy work schedules.",
      fullContent: `
      <p>To accommodate the hectic routines of working professionals, the hostel has partnered with a new laundry vendor offering same-day and next-day services.</p>

      <h3>Service Highlights</h3>
      <ul>
        <li>Express washing and ironing</li>
        <li>Extended hours from 8 AM to 11 PM</li>
        <li>Pickup and drop-off at each floor lobby</li>
        <li>Affordable packages tailored for weekly and monthly users</li>
      </ul>

      <p>The new setup ensures that residents no longer need to adjust their workload around laundry schedules.</p>
    `,
      date: new Date("2025-12-01"), // ✅ correct
      authorId: userId,
      readTime: "3 min read",
      category: "Services",
      chips: [{ label: "New Update", position: "bottom-left" }],
    },

    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1571752491225-5c1b566d4d10?q=80&w=1200&auto=format",
      title: "Nutrition Plans Launched",
      content:
        "Healthy and affordable meal plans tailored for busy professionals are now available at the hostel cafeteria.",
      fullContent: `
      <p>Our cafeteria now offers balanced and customizable meal plans designed by certified nutritionists for both male and female working residents.</p>

      <h3>Meal Plan Options</h3>
      <ul>
        <li><strong>Standard Plan:</strong> 3 healthy meals daily - PKR 8,000/month</li>
        <li><strong>Executive Plan:</strong> High-protein & low-carb meals - PKR 12,500/month</li>
        <li><strong>Fitness Plan:</strong> Gym-focused calorie-controlled menu - PKR 15,000/month</li>
        <li><strong>Vegetarian/Vegan Options:</strong> Available in all plans</li>
      </ul>

      <p>Meals are cooked fresh daily using hygienic practices, and no artificial preservatives are used.</p>
    `,
      date: new Date("2025-12-01"), // ✅ correct
      authorId: userId,
      readTime: "6 min read",
      category: "Cafeteria",
      chips: [{ label: "All Residents", position: "bottom-left" }],
    },

    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1587428248345-280d8c2fc16c?q=80&w=1200&auto=format",
      title: "Coworking Lounge Open",
      content:
        "A brand-new coworking lounge has been opened for residents who work remotely or need a focused environment during the day.",
      fullContent: `
      <p>The newly opened coworking lounge provides a calm and fully equipped workspace for professionals.</p>

      <h3>What’s Inside?</h3>
      <ul>
        <li>High-speed fiber internet</li>
        <li>Private call booths for meetings</li>
        <li>Hot desks and group pods</li>
        <li>Free tea and filtered water</li>
        <li>Access from 7 AM to 1 AM</li>
      </ul>

      <p>Whether you work remotely, freelance, or just need a quiet corner after office hours, this space is designed to support your workflow.</p>
    `,
      date: new Date("2025-12-01"), // ✅ correct
      authorId: userId,
      readTime: "5 min read",
      category: "Workspace",
      chips: [{ label: "New Facility", position: "top-right" }],
    },
  ];

  // Use create in a loop to handle Json[] fields
  for (const posts of seedPosts) {
    await prisma.post.create({
      data: posts,
    });
  }

  console.log("Blogs and admin seeded successfully!");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
