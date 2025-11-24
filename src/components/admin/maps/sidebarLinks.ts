import { Facebook, Instagram } from "@mui/icons-material";
import {
  BarChart3,
  BedDouble,
  FileEdit,
  FileText,
  Home,
  Inbox,
  LayoutPanelLeft,
  Mail,
  MailCheck,
  MessageCircle,
  Share2,
  UsersRound,
} from "lucide-react";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
export type SidebarItem =
  | {
      type: "single";
      title: string;
      icon: any | Icon;
      link: string;
    }
  | {
      type: "accordion";
      title: string;
      icon: any;
      children: {
        title: string;
        icon: any;
        link: string;
      }[];
    };

export const sidebarLinks: SidebarItem[] = [
  {
    type: "single",
    title: "Dashboard",
    icon: Home,
    link: "/admin",
  },
  {
    type: "accordion",
    title: "Content",
    icon: LayoutPanelLeft,
    children: [
      { title: "Users", icon: UsersRound, link: "/admin/users" },
      { title: "Rooms", icon: BedDouble, link: "/admin/rooms" },
      { title: "Blogs", icon: FileText, link: "/admin/blogs" },
    ],
  },
  {
    type: "accordion",
    title: "Admin Desk",
    icon: Inbox,
    children: [
      { title: "Contacts", icon: MessageCircle, link: "/admin/contacts" },
      { title: "Subscriptions", icon: MailCheck, link: "/admin/subscriptions" },
    ],
  },
  {
    type: "accordion",
    title: "Communication",
    icon: Mail,
    children: [
      {
        title: "Email Templates",
        icon: FileEdit,
        link: "/admin/email-templates",
      },
    ],
  },
  {
    type: "accordion",
    title: "Social Insights",
    icon: BarChart3,
    children: [
      { title: "Facebook", icon: Facebook, link: "/admin/social/facebook" },
      { title: "Instagram", icon: Instagram, link: "/admin/social/instagram" },
      { title: "TikTok", icon: Share2, link: "/admin/social/tiktok" },
    ],
  },
];
