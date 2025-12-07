import { ContentBlock } from "./BlockEditor";
const generateId = () => Math.random().toString(36).substring(2, 9);

export const defaultBlocks: ContentBlock[] = [
  {
    id: generateId(),
    type: "paragraph",
    text: "We're thrilled to have you on board! You'll now receive updates, exclusive offers, and important announcements from **REHMA Hostel** directly in your inbox.",
  },
  {
    id: generateId(),
    type: "paragraph",
    text: "We promise not to spam — just honest updates about rooms, hostel life, and things that might actually interest you.",
  },
  {
    id: generateId(),
    type: "paragraph",
    text: "Want to check out our latest rooms and amenities right now? Click below to explore.",
  },
];
