"use client";
import { Elevator, HotTub } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Divider,
  Rating,
} from "@mui/material";
import {
  CircleCheckBig,
  Star,
  X,
  Wifi,
  Users,
  Clock,
  Shield,
  Wallet,
  Bed,
  BedSingle,
  Router,
  DoorClosedLocked,
  CircleParking,
  Utensils,
  PlugZap,
  AirVent,
  MonitorPlay,
  Cable,
  Refrigerator,
  Zap,
  Gem,
  MoveLeft,
  MoveRight,
  CalendarCheck,
} from "lucide-react";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { scrollToSection } from "@/utils/scrollToSection";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

interface RoomChip {
  icon: React.ReactElement;
  label: string;
  bgcolor?: string;
  textColor?: string;
  color?: string;
  position: string;
}

interface Room {
  image: string;
  title: string;
  content: string;
  serviceList: string[];
  chips: RoomChip[];
  price: string;
  duration: string;
  btnText: string;
  capacity?: number;
  size?: string;
  availability?: string;
  rating?: number;
  reviews?: number;
  description?: string;
  amenities?: { icon: React.ReactElement; label: string }[];
  interval?: number;
}

const cards: Room[] = [
  {
    image:
      "https://images.unsplash.com/photo-1609587639086-b4cbf85e4355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkb3JtJTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc2MDQ0NzY5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
      { icon: <Wallet />, label: "Economy Stay", position: "bottom-left" },
    ],
    price: "PKR 10,000",
    duration: "Per Person / Per Month",
    btnText: "Show Details",
    capacity: 1,
    availability: "2 rooms available",
    rating: 4.5,
    reviews: 32,
    description:
      "Designed for simplicity and affordability, our non-AC rooms provide a quiet space with dependable power backup and strong connectivity. Perfect for professionals looking for a budget-friendly yet organized stay.",
    amenities: [
      { icon: <Router />, label: "Wi-Fi" },
      { icon: <DoorClosedLocked />, label: "Cubed Storage" },
      { icon: <PlugZap />, label: "UPS Backup" },
      { icon: <BedSingle />, label: "Mattress" },
      { icon: <CircleParking />, label: "Parking" },
      { icon: <Utensils />, label: "Mess (Paid)" },
    ],
    interval: 2000,
  },
  {
    image:
      "https://images.unsplash.com/photo-1697603899008-a4027a95fd95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3N0ZWwlMjBjb21tb24lMjByb29tfGVufDF8fHx8MTc2MDQ0NzY5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Standard Room (With AC)",
    content:
      "Comfortable AC accommodation with essential amenities at affordable rates.",
    serviceList: [
      "Air Conditioning",
      "LED TV with Cable",
      "Hot Water (Geyser)",
      "Personal Cubed Storage",
      "High-speed Internet Access",
      "Secure Parking",
      "Single Bed",
      "Elevator Access",
      "Optional Paid Meal Plan (Mess)",
      "Electricity billed separately",
    ],
    chips: [
      { icon: <AirVent />, label: "AC Room", position: "bottom-left" },
      { icon: <Star />, label: "Featured", position: "top-right" },
    ],
    price: "PKR 13,000",
    duration: "Per Person / Per Month",
    btnText: "Reserve Now",
    capacity: 1,
    size: "Single Room",
    availability: "Available",
    rating: 4.3,
    reviews: 26,
    description:
      "A cozy, well-equipped room offering cool comfort and modern facilities. Perfect for professionals or students seeking long-term accommodation with reliable service and privacy.",
    amenities: [
      { icon: <AirVent />, label: "Air Conditioner" },
      { icon: <MonitorPlay />, label: "LED TV" },
      { icon: <Cable />, label: "Cable Service" },
      { icon: <HotTub />, label: "Geyser (Hot Water)" },
      { icon: <DoorClosedLocked />, label: "Cubed Storage" },
      { icon: <Router />, label: "Internet Access" },
      { icon: <CircleParking />, label: "Parking" },
      { icon: <Bed />, label: "Bed" },
      { icon: <Elevator />, label: "Elevator" },
      { icon: <Utensils />, label: "Mess (Paid)" },
    ],
    interval: 2000,
  },
  {
    image:
      "https://images.unsplash.com/photo-1589872880544-76e896b0592c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwaG9zdGVsJTIwc3R1ZHklMjBsb3VuZ2V8ZW58MXx8fHwxNzYwNDQ3NjkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Luxury Stay",
    content:
      "Premium accommodation with modern amenities for a comfortable, elegant stay.",
    serviceList: [
      "Air Conditioning",
      "LED TV with Cable",
      "Hot Water (Geyser)",
      "Personal Cubed Storage",
      "High-speed Internet Access",
      "Secure Parking",
      "Double Bed",
      "Elevator Access",
      "Personal Fridge",
      "Included Electricity Bill",
      "Optional Paid Meal Plan (Mess)",
    ],
    chips: [{ icon: <Gem />, label: "Luxury", position: "bottom-left" }],
    price: "PKR 5,000",
    duration: "Per Day",
    btnText: "Show Details",
    capacity: 2,
    size: "Double Room",
    availability: "Available",
    rating: 4.8,
    reviews: 42,
    description:
      "A high-end stay designed for comfort and style. Ideal for travelers who prefer convenience with all bills included. Offers a private fridge and full-service environment.",
    amenities: [
      { icon: <AirVent />, label: "Air Conditioner" },
      { icon: <MonitorPlay />, label: "LED TV" },
      { icon: <Cable />, label: "Cable Service" },
      { icon: <HotTub />, label: "Geyser (Hot Water)" },
      { icon: <DoorClosedLocked />, label: "Cubed Storage" },
      { icon: <Wifi />, label: "Internet Access" },
      { icon: <CircleParking />, label: "Parking" },
      { icon: <Bed />, label: "Double Bed" },
      { icon: <Elevator />, label: "Elevator" },
      { icon: <Refrigerator />, label: "Fridge (Included)" },
      { icon: <Zap />, label: "Electricity Included" },
      { icon: <Utensils />, label: "Mess (Paid)" },
    ],
    interval: 2000,
  },
  {
    image:
      "https://images.unsplash.com/photo-1589872880544-76e896b0592c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwaG9zdGVsJTIwc3R1ZHklMjBsb3VuZ2V8ZW58MXx8fHwxNzYwNDQ3NjkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Office Package",
    content:
      "Premium accommodation with modern amenities for a comfortable, elegant stay.",
    serviceList: [
      "Air Conditioning",
      "LED TV with Cable",
      "Hot Water (Geyser)",
      "Personal Cubed Storage",
      "High-speed Internet Access",
      "Secure Parking",
      "Double Bed",
      "Elevator Access",
      "Personal Fridge",
      "Included Electricity Bill",
      "Optional Paid Meal Plan (Mess)",
    ],
    chips: [{ icon: <Gem />, label: "Luxury", position: "bottom-left" }],
    price: "PKR 5,000",
    duration: "Per Day",
    btnText: "Show Details",
    capacity: 2,
    size: "Double Room",
    availability: "Available",
    rating: 4.8,
    reviews: 42,
    description:
      "A high-end stay designed for comfort and style. Ideal for travelers who prefer convenience with all bills included. Offers a private fridge and full-service environment.",
    amenities: [
      { icon: <AirVent />, label: "Air Conditioner" },
      { icon: <MonitorPlay />, label: "LED TV" },
      { icon: <Cable />, label: "Cable Service" },
      { icon: <HotTub />, label: "Geyser (Hot Water)" },
      { icon: <DoorClosedLocked />, label: "Cubed Storage" },
      { icon: <Wifi />, label: "Internet Access" },
      { icon: <CircleParking />, label: "Parking" },
      { icon: <Bed />, label: "Double Bed" },
      { icon: <Elevator />, label: "Elevator" },
      { icon: <Refrigerator />, label: "Fridge (Included)" },
      { icon: <Zap />, label: "Electricity Included" },
      { icon: <Utensils />, label: "Mess (Paid)" },
    ],
    interval: 2000,
  },
  {
    image:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUQEhIVFRIVFRUVFRUVFxUQFQ8VFRUWFxUSFhUYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGi0dIB0tLS8tLS0tLSsrLSsrLSstLi0tNy0uLS0tLy0tKy0rLS0rKy0tLS0tKy0uLS0tLS0rLf/AABEIARMAtwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAGAAIDBAUHAQj/xABMEAABAwEFAwcHCAYIBwEAAAABAAIDEQQFEiExQVFxBiJhgZGx0RMjMlKSocEUM0JTcoKy8BUWNFRzogckYqOzw9LxY4OTwtPh40T/xAAaAQADAQEBAQAAAAAAAAAAAAAAAQIDBAUG/8QAKxEAAgIBBAIBAwIHAAAAAAAAAAECEQMEEiExE0FRBSKhI5EUYWJxgcHw/9oADAMBAAIRAxEAPwDBuy2VyOqILNMg5zCx1Qtqw2sEDNcrRSYUwTK5FKsKG0rQglqoZojYjl2KZrwqMJVhillFxpqE0hKMr1zUDKdsZVjmna1w7QuN2sc4cF2uSPsOw+9cbvaPDIW7iR2GiXsl9EMbVu3UzRYkQRDdrdEpAjaiGxPwqNgontKgosNdRTsFclVaKrQu9tTXd3oA04IqABK2WnybK/SNQPFTjT85LAt9qL3dAyHBUhsgrVeTkNaXuNGgVJOgA1KeEH8sr2xO+TMPNb84Rtdsb1bengrSsh8GPe94GeQvzwDJg3N3npP50VVrUmNUrW7AtLIGNYTkF6tOy2TJeJbh0XLVBksyOcsNFvzNWFecO1XEhm5d9pqMyFuWZ43rnththbkVvWa8aBDiCkGsNpVyGYFCFnvDpWjBbhvWTRomFQKsg1FUOQ27pW1dk2Jpz0PeMu4oKJHLkHKlmG0yDdI/sxFdgkXIf6QuZandJB7WtKVcifRRgciS73tA1zQPDbKLSbetESgxKSDQWsbwpBON6CRfCcL7pvU+Nj3oOGWoe5b910wjpXK4b8L3tGgr2rptzyc3EdgqoknEuLTLt7WjC3ANTrw3LForcxLnFx2rNve8Y4IzI85DQDVx2NHSVaQmZvKi9/IR4Wnzr8m/2Rtf1d5QIxMt16OmkMr6VOgGjANGjoCgNqW6i0jFytmg09q1bBZdp1VK6bPi5x1RHZ4VnJ0Uj2GBJXGsSUFkVts7o3Oje0te00cDqCse8GZLpdqbHeTMJpFbYxQVyx0rzHdGtDxO8Ln95WdzHOje0te00c05ELfoyYJuZzldgjURbzytKzQq2ySSCM7yr0TSNpXsEKuxwLJstIZGXbz2lEPJW0HyjmEmjm1FSdWkfAuWQyFX7tOCRrtxz4HI+4qSgskIXJf6Uov6y0j6TAezm/BdTktDDo9vaECcubsdPaIyzNojoSMwOccuKE6djl0AthuK0yjFFZ5Xt9YMcWHg+lD2qz+q9t/dZfZXceT13+TutjG6iOQiuWeN5KtXdZz5JmLUtB30rmBXrTc5b9terEsS27jgn6sWz92l9lI8m7X+7S+yu+SQqu6FVuYtiOFxXHamuB+TTZbmOPcER2nlBaYx5NlkmpQVcYZRU9HN0XTHQqCSJZydvlFKNdM5PaOV9pb6UeD7TXN71gXve8tpcHSHIei0ZAdPHpXY7ysoINQuQX9EG2iRoAADhkMh6I2LSDV9ETT+TLIToWVcAn4VauyGsgWl8GaQV3VBRoW1BGq1gjoAtJjFzM3QhGkp2NSSGEvK/k479ps5wyMzBGVNuF3Rlrs6MiAqW+f0hE7ysWG1QAgyCgEgaK4XN27aH/ZdofEaGo2HuXH7tsY8reBGxjj/AHa7csUujCLYD4POLesdnWTG3z1OCLbBZ8ljJlJDYLMr0cCtRWdWBCsyyj5FPbErfk09tnJGQ3muzLNIZnlqcxqle1NagAygnZDYGulLgzA6uBrpXAPc6lGsBJPOGQCyH8trC0BuOcAAAVstrGgp9UtiGV5s8PkyzFRvpVLaAZjmnWtFC6S07of7wLfgnmqMKTl5d+hmeONntQ/y1BJy6u0//qGX/DmFP5FvSzzj6EJP25G1/kKhdabT+7xH/nvH+Qk6HbMQct7tOlsZ1hw7wnfrVYDpbYPbA71qPE5H7PB1yv8A/AoHxy/ukB4SeMQSqIWzPN62aY+ThtMMjzWjWyMc40BJo0GpyBK5LyiH9amqNH07AB8F1+3Wttnhknks8cWEc3CWudI46NFGilTQdZ3LkAs75HOkf6TnFx6S41PvKSpOxSdlFkVVq3JZ/OdXxClbZgFeuaPzn3T3hJyEkENmZkrrAoYW5K1GFmaD2hJPokgDrsmh4HuXIrsb5y8vsO/w10cWqUkCopnWor9EkeHWud3b6d4/Yf8A4a6pu0YpUwCgb58dXxR1dUNRVBUJAke8gnC1poCBq9rdo3OK6DyflZIyrDWmoOTm8R4VCzcW42JZI79jfJZbEvXNpmaACpJOQAAqSVaDFk8opaMEY1fmehoPxP4UscN8qHqMqxY3N+jKtt/GpbCABpjcKud0hpyHXX4Ke4XPeXyvc51G4ASSc3GppuoG6f2gqNiux8h5go3bI7Tq38AiOCzNjYGN0HaSdXHp8AunK4QjtieVo45s+XyTbpft/ggkCrvV17VVmauI9oqued5CjdO71ndpTnhQPQB460v9d3aVBJan+u/2neK07Pc0jxU0YOnU9SfLycNMpRXpbT4rllrcMXTkWsU3zRgutcn1j/ad4qM3hKNJpR/zHj4qxeN2yRZuFW+s3NviOtZjiuiE4zVxdohpp0xtrndIRje55GmJxfThU5Ks4KVyicrJInq1co879094VVyt3IPO/dPeEAEsQVtgUEIU4SKJAEk5qSBhhYbzc6hczLEW10rhNMQ1qNdyEbvHnLx+w/8AwwjSFulMOp6PSBqgy7fnLf0xu/AtVdGbXIDxMq6Vu+Oo+45sncwrduQOaQ9pIcND+diyLtNLRmKilCN4NQR1gkIrsVi8nzdRq07xsd+dtV16ZppxPG+o43vjNBJZH+UaHAUJyI9Vw1H52FQ/ImPPlXtxE+iDWjWj0cttdc6+kldhoJAPVLxxaD4hW7U9sYJcaNbl0mmgG85LGcHCTUfZ3YskcuNSyeuyCQbB1D4BVH6kVFQKkVFQKgVprqR2rJvK83vJAOFm4Vz+0dvcpbjgLWOefpkU4NqK9ZP8qUsG2O6TJx65ZMqx41x8luRVZlckCpyhc56BSkK0bjsAd51wyBo0byNXdSoSBFNmiwsa0bGjuz99VwfUMzhjpezbBFOXPoT1A4qd4Vd68CjuIpACKEVB1BzBG5BN92DyMlB6Ds27ab29XdRGrlgcr2+ZDtodl1g/EDsXboMjhlUfTMM8U438Aq5ROTiaGh02bepV3PJzHo/i2di+io4BPVy4vnT9k94VNyuXH879094QAVwhTAKOLRTBIoc1JOC8QAcRRiugpT3oKuz5y3fwnfgRtG6hpt1piBNNK0pWiCrt+ctn8E/gWsVwTLsCbJ+0dQXSbriD4wHbNDtbw8Fzaz/tA4BdJuc8wJxbTtEOKkqatEvycxknVhDmlw2YgQKjUZkKpyglxYNxbjPXSnxWyD+fgs/5IC84hUMDcA2YXFxqd9CCF0RyJ/c/RwZtNKMfHDqX49mHY7vMmbso9+19NjfiVquGwCgGQA0AGgCsyfnwWHe17YCY46F+hccwzoA0J6SspOWaVIuMcWix7pdv8l97DStPyf8AY9iqyhVrhcXMkeSSXPAJOZOBtdfvq5KsskNktp1YM3lxqdVZRlRRA/ExrhtaO7MIZlV+5rfh8080H0SfoncdwXm6/C5wtdxOzDLa+fZrPVd6syKrODQ4aYqHDXSuytNlV4VHZZVtkeJpGe/IlpNM6VGedEN8qaBkbWvcWucH0ccVGilKOPOzrtJ0W6+0UaXulIw5ObhZUO9WlK1689dM0FW2dzy6uozYBphBqGgbADUf7r1NBge630jmzTVV8lO0itBvI78z+d6hnGwbx3qaciozyyNejM17WtTH61Oz3bhx8V7NHGytgzGZJrv6Ds0Wjcfzo4FZ8gOumwClTw4rQuEHyorrhKKBBbFopmhQxKcJFnoSSSQAatIMxeCMJjwjMDMProg+7vnLZ/BP4SjQN6Bp6or3IKu75217vIn8BWseiJARCf6wOA+K6PdL2hoBcAaA7RrxXNoz58cPFH1gZiiBb6Tdm1zdadRqesqsUU5VIyzTnCG6Cto3GytOQc0niEnjozHaQaVHuBHCm1YRkFNPz3KxYrbhIBNW7jq37J+G1dD09co4IfUVJ7Zqie8pcEbnjUCgPS6gBHbXqQbLkOk92388UX34AYqA6lpBGeVTWm+h2f2gFnWC5ziEkooBm2PXhi3Do7VWJxxwbZz62GTUZlGPx+38yS7LN5OFrTqSXnoLqUHshqm8lXgrRbUryReXqM/Lrs+l0WjSgk+l+Sk5gHissitT0rRtjuaVoXLdMUsQc/FXEW5GmnVxWemTlbZvrKW2KMSG8pGCgNRudnTgvZb9fsa0dOZ+Ko1yULynLTYpO3FHGskkqTKt42h8jtavG3QMG4jbw7tVSmaTqAabQS3rG7tVowkaONM9QD76V1VaSEl1HPJaBUjJoOeWYzpkdSt0klSM2zJtLiHNwg0Fdc6VIqfzopvJHpr04cuFArDwKggc0A0AFKjLQbs/coGsFCATQGgzypqKdtFQETqtNSa7K6Yercr9yfO/dPwVB7Bx4kn3FXbjPnfun4IEFseimaq8ZU7EqLJAEk4JIoAktfLOMDmRufwzB9kHvQbcF4Y5LVUYasIAqCaBm2i1bXfUQ+assfGUumJ4tJp3rGt98TFpaHBjfVjayEcOYAe1aOSRFNgripMOpHtyS0aFz2R/nQi6x3gyKNrnh1C7CS2hDcqioJGtHdimPLpBOSgrfQUywMk9IZ7280+B7FD+ioztf7Tf9Kr2K9IpMmSAncasJ4YgKngrokW3kyR4s5/Bp8v3UmRvgDXxYa4A85E1wuLHYXCu8huW8NVp5VeZ1afxIj2TMJPYHKRjllmyPbbOjS4F5HCPXH/fgdRQTKYlNlszy3GGEt0qBXTgvLds+gW2KS6MW8H6DrU1gvySFmBoYRUnnAk58D0KlbWPxElj6De13gqb3U1B7F24Y7Yo8jUT3ZGxOKhcUx8w3pMa53osc47g0uPuC0o5xkhVSRgJrwy2ZEmtOtXp7HMNYZdh9BxAB0NaUVCSo+i7sIonQiN5zHA94VaWidJNmBQ6HZ0hRuje70Y3ng1x7gnQFZ5Vq43ed+6fgmNum0O0gkHS9piHa+ijul+Ccsdk5uJpG4ggHuQINYirLFSgcrkaCycJLxqSBmW5UrY7JXnlZF5y0CzbHRgyv86iOIGSFzBm6gc37TcwOJFR1oRkk56LOTdmknIZG0uIpU7GDe47P/SqMtrsicN8XH5KVkfXju0r+dyKrjvAuBjcauaKtJ1LRq076ZEdFdy0TyJiccb3vxnN2EhrXO2uoQc+/VWLPyRjY5rxJJVpqM2HiDzdCMl0T1WOUaZ5uD6fqMORSjVf39EPls/sguPEgsb3yH7gU7H5BXBcbc+c/M11buAA00y953qle8LLO0EvcSdAaabSaBedqMqcVR9DoYbZvd7JQ9EPJySsbhud3gIKZb2nQoo5HzYhKNxYe0O8EtK/1Dp1y/SNiVirvCtTFVJHL0WeQiF7lnW2Y+5XZVn2oKGUO5O2vE98ZzIax3tF4/7VqWiIbkL3M/BbKbHxH+7f/wDQIunCF0Jma6MBV5grkgVaUIaAw7y0XIr+eYra/pcHDg4An317F2a3Q1BXKf6RLEWvjnA1rG7qq5ne73JLsUugoue042A9C2IygrkdbKtw7kYxOQSWmleJrCkgdmVM5YF7SLYtDkNXvKsX2aejHkk5xK7fcbnRwtZCGMYAMgBmcIq4801PSuESOzK7ZctorE3PYPwhZah0ka4Em2bZtc3rN7B/pTDbZt7ewf6VXx8Pz1JGQdHuXFLLI61BEdqv6SN2BwJJaXAhhLcvol2GgPQhvlvaXYXuJq7IbqADQLfthaWOyHou3big/l1PqOkdylScmkWqjyRclYJLTJ5NhpQYnOIqGDQZbSTpwO5dT5NXWbMx+J+PEW54cFKA9Jrqh7+i67MFjExHOmcXdOEc1o4c0nrRhKyoodOJHcvYwYVBX7ODUZ3lfPoimtKrGZSusLD9H3u8VH+jo/U958VtRgRueontBCsGwM9X3u8U35G3cfad4pUMxjZi20ROHrOHU5pr72tW9a7UBlXNRfJxu0z1dl71E+xMP0fe4/FKqAjdac1E6cFSOu+P6sdi8+Qs9Qe9AELiChnljcHyiB7W6+kKZmrTUEDtHWiv5I0fRCabOPVCKA4jdFmlssgc9p8kTTGK4c9K+qeKPrLKCAUVPsbCC3AMJFCKChG6iw7Vydwc6A4d8bjVp+ydW93BFENEbXJKtjLTgeC1247ekEZEcEkhGVaXIWveTNENqehW9HZrFdmrZnE5rqVyWrzbc/ot/CFyoldCuh3Mb9lvcufWcJG+l5bC2Of+0fz1qYSnf7h4rGhcrjZMl5zmdqiWLRKcLsj6J3bj0oN5ZNMk7Ym+k97Gji6jR7yiJ1sBaTlo6nVVVbBYzPe8LdjHeVd0CNuIfzYR1rTTfdkSJzLbFnUrBYmwxMhb6MbGsHBop8FI5qmco3L6A8pERamFqlcmFAyMhRuapimFIZCQmEKVyjKQEZCYVKVGQkAwpikTCgBhUbgpSE0oAp2uyMkGF7Q4a5716rBC9QKjldqfkhi8XZrdtT8kO2w1KxigbKZKPbnfzG/Zb3BAdFdvCVwDSHOHNboSNnQstRj8lI1wT2WzpMT/AM5K0yVcbFsl+tk9t4+KcLfN9fL/ANSTxWH8B/V+Db+MXwdfmhFCQ0VoejYt7kFYa2m02kjRrImn7VHvH8rO1cF/SU9Pn5v+rJ4r6a5JQYLMHbZHveenPCPc0K8Gl8eVe+/9CyZ9+Nmu5RlPJUZK9M5EeFMKcU0pDGlNTivCkBE5MIUpTCgZGQmEKUhNIUgQkJhCmITCEARUTSpaJpCAIiEk8hJAHFLU/JY8zFoTOqoDGsboVFAxFSWmMuoKaAK9HGr9nseJQ5clLhA18jO5SRXc46AoygusbloWe7ANie9i2oB/0HLTJuewL6dskHk42R+qxrewALmlxXbitETSMi9pPAGp9wXUnrbDzbYpfBCUwp7lGVsJHhK8JXpTSkM8TSvSvCkA0ppTk0oGNKa5OK8KkCMppCkKYQgBhCbRSEJpQAwhJelJAHBqJpak1WLNDU1K5hktmiW3YoVBZYAtmzRpAWLPCFcihKiZGrsQICBmvyVstZg/1AT1uGED3k9SLJ5AFkcmoaR4qZuNer0R7qnrWTe9vc6d9CaDJvAZLpi9sSGrYSOmCb5RCb7e8ZAqM3hJ6xR5B0F+NNxIRNvf6xTTbn+sUvIFBd5QJpkCEflz95TDbnbyl5B0F/lQmmYIQNtdvKabY7el5AoLzaAm/KAhA2w714bYd6PIFBcbQF55cIQNtO9efLTvS3hQXmcbwmmYdCEflhTTbCjeFBeZhvCSDjbDvSRvCjnjW1yWtYLMqdihqURWGHoWYIkslnqtSzWdNs8ZqtFgAQA1sasxQlzg0akgdq9jIV66o+cX+qPech8T1JxVsYQ2MhrSRo2tODRQIJnf5wouc+kDjvyQVM7zhW030SiU7SmpxTVkM8K8KcU0pDGEJhUhTCgBhTCnlNKQDSmlelNKAPCmFelNJQAqppKVU1xQIRKSaSkgDPu6xjJblnsqlu6wrYjstE0gKDIaKcMpkrZgUfk96dAeRgLXsjcMddrjXqGQ9+JZq1JXaNGgAA6lUEDLF5OpC0b6n35IJmfzzxRhf7qUbuAHYFxq+b3nZaJmtkIAkeAKNNADkNE8jBdB+1y9K503lFavrf5WeCmbymtX1gP3GeCz3IdB6vHFAn6y2r6wewzwSPKO0/WD2GeCW5BQcFMqgf8AWK0/WD2GeC8/WK0+uPYZ4ItAG7kxBR5R2n12+wzwTDyitPrj2GeCLQBu5RuQUeUdp9cewzwTDyhtPrj2G+CADYphQUeUNp9cewzwTXcobT649hngmINKphKCjf8AaPrP5WeC8/T1o9f+VvgigDQleIL/AE/aPXHst8F6nQHYbKwK6AkkrQhEKOQLxJMBoCt2b04/tN7wkkkgFfp5xXFr9/aZv4r/AMRSSU5BxKjU8JJLBljgF6kkkM8TSkkgBpTCkkqQhpTSkkqENKYUkkCGleJJKhDSkkkgD//Z",
    title: "Standard Daily Stay",
    content:
      "Affordable short-term stay with all basic amenities and utilities included.",
    serviceList: [
      "Air Conditioning",
      "LED TV with Cable",
      "Hot Water (Geyser)",
      "Personal Cubed Storage",
      "High-speed Internet Access",
      "Secure Parking",
      "Single Bed with Mattress",
      "Elevator Access",
      "Electricity Bill Included",
    ],
    chips: [
      { icon: <CalendarCheck />, label: "Short Stay", position: "bottom-left" },
    ],
    price: "PKR 3,500",
    duration: "Per Day",
    btnText: "Book Now",
    capacity: 1,
    size: "Single Room",
    availability: "Available",
    rating: 4.1,
    reviews: 18,
    description:
      "Affordable daily accommodation perfect for quick stays or short visits. Includes all utilities and comfortable essentials for a hassle-free experience.",
    amenities: [
      { icon: <AirVent />, label: "Air Conditioner" },
      { icon: <MonitorPlay />, label: "LED TV" },
      { icon: <Cable />, label: "Cable Service" },
      { icon: <HotTub />, label: "Geyser (Hot Water)" },
      { icon: <DoorClosedLocked />, label: "Cubed Storage" },
      { icon: <Wifi />, label: "Internet Access" },
      { icon: <CircleParking />, label: "Parking" },
      { icon: <Bed />, label: "Bed with Mattress" },
      { icon: <Elevator />, label: "Elevator" },
      { icon: <Zap />, label: "Electricity Included" },
    ],
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

interface RoomDetailsModalProps {
  open: boolean;
  onClose: () => void;
  room: Room | null;
}

const RoomDetailsModal: React.FC<RoomDetailsModalProps> = ({
  open,
  onClose,
  room,
}) => {
  if (!room) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          overflow: { xs: "auto", md: "hidden" },
          height: { xs: "auto", md: "85vh" },
          maxHeight: { xs: "90vh", md: "85vh" },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          height: "100%",
        }}
      >
        {/* Left Side - Image */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            height: { xs: 300, md: "100%" },
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={room.image}
            alt={room.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
            }}
          />
          <Chip
            label={room.title}
            sx={{
              position: "absolute",
              bottom: 20,
              left: 20,
              backgroundColor: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
              fontWeight: 600,
              fontSize: "1rem",
              px: 2,
              py: 1,
              height: "auto",
              "& .MuiChip-label": {
                px: 1,
                textWrap: "wrap",
              },
            }}
          />
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              bgcolor: "rgba(255,255,255,0.9)",
              "&:hover": {
                bgcolor: "white",
              },
            }}
          >
            <X size={20} />
          </IconButton>
        </Box>

        {/* Right Side - Details */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DialogContent
            sx={{
              flex: 1,
              p: { xs: 3, md: 4 },
              overflow: "hidden",
              scrollbarWidth: "thin", // Firefox
              scrollbarColor: "#7B2E2E transparent",
              transition: "all 1s ease-in-out",
              scrollbarGutter: "stable",
              "&:hover": {
                overflowY: "overlay",
              },
              "&::-webkit-scrollbar": {
                width: "8px",
                backgroundColor: "transparent", // track
              },
              "&::-webkit-scrollbar:hover": {
                boxShadow: "0 4px 15px rgba(212, 163, 115, 0.4)",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#7B2E2E",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#D4A373",
                boxShadow: "0 4px 15px rgba(212, 163, 115, 0.4)",
              },
            }}
          >
            {/* Header */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  fontFamily: "Poppins, sans-serif",
                  color: "#3D444B",
                  mb: 1,
                }}
              >
                {room.title}
              </Typography>
              <Typography variant="body1" sx={{ color: "#505A63", mb: 2 }}>
                {room.content}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Rating
                  value={room.rating || 4.5}
                  readOnly
                  precision={0.5}
                  sx={{
                    mt: 0.5,
                    "& .MuiRating-iconFilled": {
                      color: "#7B2E2E",
                    },
                    "& .MuiRating-iconEmpty": {
                      color: "#BAB1AD",
                    },
                  }}
                />
                <Typography variant="body2" sx={{ color: "#505A63" }}>
                  {room.rating} ({room.reviews} reviews)
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Quick Info */}
            <Box sx={{ mb: 3 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      bgcolor: "#F1E9E9",
                      borderRadius: 1,
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Users size={24} color="#7B2E2E" />
                    <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
                      {room.capacity} Person
                      {room.capacity && room.capacity > 1 ? "s" : ""}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      bgcolor: "#F1E9E9",
                      borderRadius: 1,
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Clock size={24} color="#7B2E2E" />
                    <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
                      Available
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      bgcolor: "#F1E9E9",
                      borderRadius: 1,
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Shield size={24} color="#7B2E2E" />
                    <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
                      Secure
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Description */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 2, color: "#3D444B" }}
              >
                About This Room
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#505A63", lineHeight: 1.8 }}
              >
                {room.description}
              </Typography>
            </Box>

            {/* Amenities */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 2, color: "#3D444B" }}
              >
                Amenities & Services
              </Typography>
              <Grid container spacing={2}>
                {room.amenities?.map((amenity, index) => (
                  <Grid
                    size={{ xs: 12, sm: 4 }}
                    sx={{
                      justifyContent: { xs: "center" },
                    }}
                    key={index}
                  >
                    <Chip
                      label={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            gap: 1,
                            width: "100%",
                            textAlign: "left",
                          }}
                        >
                          <Box
                            sx={{
                              color: "#7B2E2E",
                              display: "flex",
                              alignItems: "center",
                              flexShrink: 0,
                              fontSize: 20,
                            }}
                          >
                            {amenity.icon}
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#3D444B",
                              fontWeight: 500,
                              wordWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            {amenity.label}
                          </Typography>
                        </Box>
                      }
                      sx={{
                        minWidth: "160px",
                        maxWidth: "160px",
                        py: 3.5,
                        px: 1.5,
                        borderRadius: 0.5,
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        bgcolor: "#ECE1E1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Pricing */}
            <Paper
              sx={{
                p: 3,
                bgcolor: "#7B2E2E",
                background: "linear-gradient(135deg, #7B2E2E 0%, #5F2424 100%)",
                boxShadow: "0 20px 40px rgba(123,46,46,0.4)",
                color: "white",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: { xs: "center" },
                  mb: 2,
                }}
              >
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Monthly Rent
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: "#D4A373" }}
                  >
                    {room.price}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {room.duration}
                  </Typography>
                </Box>
                <Chip
                  label={room.availability}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.3)",
                    my: 2,
                  }}
                />
              </Box>

              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <Button
                  onClick={() => {
                    onClose();
                    setTimeout(() => {
                      scrollToSection("contact");
                    }, 400);
                  }}
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "#D4A373",
                    color: "#FDF9F6",
                    borderRadius: 0.5,
                    width: { xs: 150, md: 220 },
                    py: "10px",
                    px: "15px",
                    fontWeight: 600,
                    border: "1px solid #7B2E2E",
                    boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.25)",
                    transition: "all 0.3s",
                    "&:hover": {
                      bgcolor: "primary.contrastText",
                      color: "#7B2E2E",
                      boxShadow: "0 4px 15px rgba(212, 163, 115, 0.4)",
                    },
                  }}
                >
                  Book Now
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  href="https://wa.me/923259881310"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    bgcolor: "primary.contrastText",
                    color: "#7B2E2E",
                    borderRadius: 0.5,
                    width: { xs: 150, md: 220 },
                    py: "10px",
                    px: "15px",
                    fontWeight: 600,
                    border: "1px solid #7B2E2E",
                    boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.2)",
                    transition: "all 0.3s",
                    "&:hover": {
                      color: "#D9D4D1",
                      bgcolor: "#D4A373",
                      boxShadow: "0 4px 15px rgba(212, 163, 115, 0.4)",
                    },
                  }}
                >
                  Contact
                </Button>
              </Stack>
            </Paper>
          </DialogContent>
        </Box>
      </Box>
    </Dialog>
  );
};

function Rooms() {
  const [open, setOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleOpen = (room: Room) => {
    setSelectedRoom(room);
    setOpen(true);
  };

  return (
    <Box
      sx={{
        py: 8,
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
          }}
        >
          <Chip
            label="ACCOMMODATION OPTIONS"
            variant="outlined"
            sx={{
              bgcolor: "#F1E9E9",
              "& .MuiChip-label": {
                color: "#7B2E2E",
                fontWeight: 600,
              },
            }}
          />
          <Typography
            variant="h2"
            sx={{
              color: "#3D444B",
              py: 2,
            }}
          >
            Choose Your <br />
            <Box component="span" sx={{ color: "#7B2E2E" }}>
              Perfect Room{" "}
            </Box>{" "}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#505A63",
              width: "60%",
            }}
          >
            Explore comfortable rooms for rent in Lahore from private spaces to
            shared options, each designed to support both your comfort and your
            goals.
          </Typography>
        </Box>
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            py: 4,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              height: { xs: "70%", md: "100%" },
              width: { xs: "50px", sm: "100px" },
              background:
                "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />

          {/* Right gradient fade */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              height: { xs: "70%", md: "100%" },
              width: { xs: "50px", sm: "100px" },
              background:
                "linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Swiper
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={3}
              loop={true}
              speed={800}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{
                el: ".swiper-pagination-custom",
                clickable: true,
                dynamicBullets: true,
              }}
              modules={[Navigation, Pagination, Autoplay]}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 20 },
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
              }}
              style={{
                width: "100%",
                height: "100%",
                overflow: "visible",
              }}
            >
              {cards.map((items, index) => (
                <SwiperSlide
                  key={index}
                  style={{
                    width: "fit-content",
                    height: "auto",
                  }}
                >
                  <Card
                    sx={{
                      mt: 5,
                      ml: { xs: 3.5, md: 1 },
                      width: "100%",
                      transition: "all 0.3s ease",
                      backgroundColor: "rgba(217,212,209,0.25)",
                      backdropFilter: "blur(8px)",
                      boxShadow:
                        index === 1
                          ? "0 20px 40px rgba(123,46,46,0.45)"
                          : "0 8px 20px rgba(123,46,46,0.25), 0 2px 5px rgba(0,0,0,0.1)",
                      transform: index === 1 ? "translateY(-10px)" : "none",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: "0 20px 40px rgba(123,46,46,0.4)",
                      },
                      bgcolor: "#FFFFFF",
                      borderRadius: 1,
                      cursor: "default",
                      height: { xs: 900, sm: 800 },
                    }}
                  >
                    <Stack
                      direction={"column"}
                      sx={{
                        position: "relative",
                      }}
                    >
                      <CardMedia
                        component="img"
                        src={items.image}
                        alt={`Room ${index + 1}`}
                        sx={{
                          width: "100%",
                          maxHeight: "260px",
                          minHeight: "260px",
                          objectFit: "cover",
                          borderTopLeftRadius: "4px",
                          borderTopRightRadius: "4px",
                          display: "block",
                        }}
                      />

                      {items.chips.map((chip, i) => (
                        <Chip
                          key={i}
                          icon={chip.icon}
                          label={chip.label}
                          sx={{
                            position: "absolute",
                            ...(chip.position === "top-right" && {
                              top: 10,
                              right: 10,
                            }),
                            ...(chip.position === "top-left" && {
                              top: 10,
                              left: 10,
                            }),
                            ...(chip.position === "bottom-right" && {
                              bottom: 10,
                              right: 10,
                            }),
                            ...(chip.position === "bottom-left" && {
                              bottom: "70%",
                              left: 10,
                            }),

                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            px: 2.5,
                            py: 1.2,
                            borderRadius: "10px",
                            fontWeight: 600,
                            fontFamily: "Inter",
                            fontSize: "0.9rem",
                            border: "1px solid rgba(255,255,255,0.3)",
                            backdropFilter: "blur(8px)",
                            transition: "all 0.4s ease-in-out",

                            ...(chip.position === "top-right"
                              ? {
                                  background: "rgba(123,46,46,0.6)",
                                  color: "#FFFFFF",
                                  "& .MuiChip-icon": { color: "#FFFFFF" },
                                }
                              : {
                                  background: "rgba(255,255,255,0.65)",
                                  color: "#7B2E2E",
                                  "& .MuiChip-icon": { color: "#7B2E2E" },
                                }),

                            "&:hover": {
                              transform: "translateY(-6px)",
                              boxShadow:
                                chip.position === "top-right"
                                  ? "0 10px 25px rgba(123,46,46,0.5)"
                                  : "0 10px 25px rgba(255,255,255,0.6)",
                              background:
                                chip.position === "top-right"
                                  ? "rgba(123,46,46,0.8)"
                                  : "rgba(255,255,255,0.85)",
                            },
                          }}
                        />
                      ))}

                      <CardContent
                        sx={{
                          px: 2,
                          py: 3,
                        }}
                      >
                        <Typography
                          variant="h3"
                          fontFamily="Poppins"
                          color="#7B2E2E"
                          sx={{
                            pb: 1,
                          }}
                        >
                          {items.title}
                        </Typography>

                        <Typography
                          variant="body1"
                          fontSize="16px"
                          color="#505A63"
                        >
                          {items.content}
                        </Typography>

                        {/* Top Divider */}
                        <Divider
                          sx={{ my: 2, bgcolor: "rgba(123,46,46,0.3)" }}
                        />

                        {/* Scrollable List */}
                        <Box
                          sx={{
                            position: "relative",
                            maxHeight: 200,
                            overflowY: "auto",
                            py: 1.5,
                            pr: 1,
                            "&::-webkit-scrollbar": {
                              width: "6px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                              backgroundColor: "rgba(123,46,46,0.5)",
                              borderRadius: "4px",
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                              backgroundColor: "rgba(123,46,46,0.8)",
                            },
                            // top fade
                            "&::before": {
                              content: '""',
                              position: "sticky",
                              top: 0,
                              left: 0,
                              right: 0,
                              height: 12,
                              background:
                                "linear-gradient(to bottom, rgba(246,244,244,1), rgba(246,244,244,0))",
                              zIndex: 1,
                            },
                            // bottom fade
                            "&::after": {
                              content: '""',
                              position: "sticky",
                              bottom: 0,
                              left: 0,
                              right: 0,
                              height: 12,
                              background:
                                "linear-gradient(to top, rgba(246,244,244,1), rgba(246,244,244,0))",
                              zIndex: 1,
                            },
                          }}
                        >
                          {items.serviceList.map((list, j) => (
                            <List key={j} dense disablePadding>
                              <ListItem
                                sx={{
                                  alignItems: "flex-start",
                                  py: 0.3,
                                }}
                              >
                                <ListItemIcon
                                  sx={{
                                    minWidth: "30px",
                                    color: "#7B2E2E",
                                  }}
                                >
                                  <CircleCheckBig size="20px" />
                                </ListItemIcon>

                                <ListItemText
                                  primary={list}
                                  sx={{
                                    mt: "-2px",
                                    "& .MuiListItemText-primary": {
                                      fontFamily: "Inter",
                                      color: "#505A63",
                                      fontSize: "0.95rem",
                                    },
                                  }}
                                />
                              </ListItem>
                            </List>
                          ))}
                        </Box>

                        {/* Bottom Divider */}
                        <Divider
                          sx={{ my: 2, bgcolor: "rgba(123,46,46,0.3)" }}
                        />

                        {/* Price Section */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: "6px",
                            mt: "auto",
                            px: 1,
                          }}
                        >
                          <Typography
                            variant="h3"
                            color="#7B2E2E"
                            fontFamily="Inter"
                            fontWeight={700}
                          >
                            {items.price}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="#505A63"
                            sx={{ fontFamily: "Poppins" }}
                          >
                            {items.duration}
                          </Typography>
                        </Box>
                      </CardContent>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mt: "auto",
                          mb: 5,
                        }}
                      >
                        <Button
                          onClick={() => handleOpen(items)}
                          sx={{
                            bgcolor: index === 1 ? "white" : "#7B2E2E",
                            color: index === 1 ? "#7B2E2E" : "white",
                            border: "2px solid #7B2E2E",
                            borderRadius: 0.5,
                            mb: 2,
                            py: "10px",
                            px: "15px",
                            width: 200,
                            fontWeight: 600,
                            boxShadow:
                              index === 1
                                ? "5px 5px 10px rgba(0,0,0,0.15)"
                                : "5px 5px 10px rgba(123, 46, 46, 0.2)",
                            transition: "all 0.3s",
                            "&:hover": {
                              bgcolor: index === 1 ? "#7B2E2E" : "white",
                              color: index === 1 ? "white" : "#7B2E2E",
                            },
                          }}
                        >
                          {items.btnText}
                        </Button>
                      </Box>
                    </Stack>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation and Pagination Container */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: { xs: 2, sm: 3, md: 4 },
                mt: { xs: 3, sm: 4, md: 5 },
                position: "relative",
                zIndex: 10,
              }}
            >
              <IconButton
                className="custom-button-prev"
                sx={{
                  color: "#7B2E2E",
                  bgcolor: "rgba(123,46,46,0.1)",
                  border: "2px solid #7B2E2E",
                  "&:hover": {
                    bgcolor: "#7B2E2E",
                    color: "white",
                  },
                  width: { xs: 40, sm: 45, md: 50 },
                  height: { xs: 40, sm: 45, md: 50 },
                }}
              >
                <MoveLeft />
              </IconButton>

              <Box
                className="custom-pagination"
                sx={{
                  "& .swiper-pagination-bullet": {
                    bgcolor: "#D4A373",
                    opacity: 0.5,
                    width: { xs: 8, sm: 10, md: 12 },
                    height: { xs: 8, sm: 10, md: 12 },
                    mx: { xs: 0.5, sm: 0.75, md: 1 },
                  },
                  "& .swiper-pagination-bullet-active": {
                    bgcolor: "#7B2E2E",
                    opacity: 1,
                    width: { xs: 10, sm: 12, md: 14 },
                    height: { xs: 10, sm: 12, md: 14 },
                  },
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 0.5, sm: 1 },
                }}
              />

              <IconButton
                className="custom-button-next"
                sx={{
                  color: "#7B2E2E",
                  bgcolor: "rgba(123,46,46,0.1)",
                  border: "2px solid #7B2E2E",
                  "&:hover": {
                    bgcolor: "#7B2E2E",
                    color: "white",
                  },
                  width: { xs: 40, sm: 45, md: 50 },
                  height: { xs: 40, sm: 45, md: 50 },
                }}
              >
                <MoveRight />
              </IconButton>
            </Box>

            <style jsx global>{`
              .swiper {
                overflow: visible !important;
                padding-right: 60px;
              }

              .swiper-wrapper {
                display: flex;
                align-items: stretch;
              }

              .swiper-slide {
                width: 32% !important;
                flex-shrink: 0 !important;
                height: auto !important;
              }

              @media (max-width: 1024px) {
                .swiper-slide {
                  width: 50% !important; /* 2 per view */
                }
              }

              @media (max-width: 640px) {
                .swiper-slide {
                  width: 100% !important; /* 1 per view */
                }
              }
            `}</style>

            <Box>
              <Container maxWidth={"sm"} sx={{ py: 4 }}>
                <motion.div variants={cardVariants}>
                  <Paper
                    elevation={16}
                    sx={{
                      pt: 4,
                      pb: 6,
                      px: 2,
                      bgcolor: "#7B2E2E",
                      boxShadow: "0 20px 40px rgba(123,46,46,0.4)",
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    <Stack direction={"column"}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        Special Promotion
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ mb: 1 }}
                        color="#D4A373"
                      >
                        Book for 6 months and get{" "}
                        <Box component="span" sx={{ fontWeight: 800 }}>
                          1 month FREE
                        </Box>
                        !
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Limited time offer. Contact us for details.
                      </Typography>
                      <Box
                        sx={{
                          display: "grid",
                          placeItems: "center",
                          pt: 2,
                        }}
                      >
                        <Button
                          component={Link}
                          href="/rooms"
                          sx={{
                            bgcolor: "primary.contrastText",
                            color: "#7B2E2E",
                            borderRadius: 0.5,
                            width: { xs: 200, md: 300 },
                            py: "10px",
                            px: "15px",
                            fontWeight: 600,
                            border: "1px solid #7B2E2E",
                            boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.2)",
                            transition: "all 0.3s",
                            "&:hover": {
                              color: "#D9D4D1",
                              bgcolor: "#D4A373",
                              boxShadow: "0 4px 15px rgba(212, 163, 115, 0.4)",
                            },
                          }}
                        >
                          Show More Room
                        </Button>
                      </Box>
                    </Stack>
                  </Paper>
                </motion.div>
              </Container>
            </Box>
          </motion.div>
        </Box>
      </Container>

      <RoomDetailsModal
        open={open}
        onClose={() => setOpen(false)}
        room={selectedRoom}
      />
    </Box>
  );
}

export default Rooms;
