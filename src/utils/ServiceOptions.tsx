import { AcUnit, Article, Elevator, HotTub } from "@mui/icons-material";
import {
  Bed,
  BedSingle,
  Cable,
  CircleParking,
  DoorClosedLocked,
  MonitorPlay,
  PlugZap,
  Refrigerator,
  Router,
  Utensils,
} from "lucide-react";

export const serviceOptions = [
  "Wifi",
  "UPS",
  "Parking",
  "Mess (Paid)",
  "AC",
  "LED",
  "Cable",
  "Hot Water (Geyser)",
  "Cubed storage",
  "Bed",
  "Elevator",
  "Fridge",
  "Electricity Included",
  "Mattress",
];

export const serviceIcons: { [key: string]: React.ReactElement } = {
  Wifi: <Router />,
  UPS: <PlugZap />,
  AC: <AcUnit />,
  Parking: <CircleParking />,
  "Mess (Paid)": <Utensils />,
  "Cubed storage": <DoorClosedLocked />,
  "Hot Water (Geyser)": <HotTub />,
  LED: <MonitorPlay />,
  Cable: <Cable />,
  Elevator: <Elevator />,
  Bed: <BedSingle />,
  Mattress: <Bed />,
  Fridge: <Refrigerator />,
  "Electricity Included": <Article />,
};
