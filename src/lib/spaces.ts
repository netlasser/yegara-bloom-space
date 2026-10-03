import desksAsset from "@/assets/yegara-desks.jpg.asset.json";
import officeOneAsset from "@/assets/yegara-office-one.jpg.asset.json";
import officeExecAsset from "@/assets/yegara-office-exec.jpg.asset.json";
import boardroomAsset from "@/assets/yegara-boardroom.jpg.asset.json";
import loungeAsset from "@/assets/yegara-lounge.jpg.asset.json";
import cafeAsset from "@/assets/yegara-cafe.jpg.asset.json";

export type SpaceImage = { src: string; alt: string; pos?: string };

export type Space = {
  slug: string;
  n: string;
  name: string;
  tagline: string;
  intro: string;
  /** Only facts actually provided by Yegara. Never add prices, seats or sizes here. */
  facts: { label: string; value: string }[];
  images: SpaceImage[];
  related: string[];
};

const LOCATION = "Bloom Tower, 3rd Floor, Kazanchis";

export const spaces: Space[] = [
  {
    slug: "private-offices",
    n: "01",
    name: "Private Offices",
    tagline: "Executive & 1-Person, for focus that means business.",
    intro: "A door that closes, a desk that's yours. Choose an executive office or a 1-person office and work with complete focus.",
    facts: [
      { label: "Formats", value: "Executive & 1-Person" },
      { label: "Location", value: LOCATION },
      { label: "Availability", value: "Talk to us about availability." },
    ],
    images: [
      { src: officeOneAsset.url, alt: "1-person private office with white desk and wood cabinetry at Yegara Space", pos: "object-[50%_60%]" },
      { src: officeExecAsset.url, alt: "Executive private office with desk and yellow lounge chairs at Yegara Space" },
    ],
    related: ["dedicated-desks", "meeting-rooms"],
  },
  {
    slug: "dedicated-desks",
    n: "02",
    name: "Dedicated Desks",
    tagline: "Your seat, every day.",
    intro: "Your own desk in the open workspace — the same spot every day, surrounded by people building things.",
    facts: [
      { label: "Location", value: LOCATION },
      { label: "Availability", value: "Talk to us about availability." },
    ],
    images: [{ src: desksAsset.url, alt: "Open workspace with rows of dedicated desks at Yegara Space", pos: "object-[45%_50%]" }],
    related: ["hot-desks", "private-offices", "cubicles"],
  },
  {
    slug: "cubicles",
    n: "03",
    name: "Cubicles",
    tagline: "Quiet corners, real productivity.",
    intro: "A quieter corner of the floor for heads-down work, without shutting yourself away from the space.",
    facts: [
      { label: "Location", value: LOCATION },
      { label: "Availability", value: "Talk to us about availability." },
    ],
    images: [{ src: desksAsset.url, alt: "Workstations in the Yegara Space workspace", pos: "object-[20%_60%]" }],
    related: ["dedicated-desks", "phone-booths", "hot-desks"],
  },
  {
    slug: "hot-desks",
    n: "04",
    name: "Hot Desks",
    tagline: "Drop in, plug in, get it done.",
    intro: "Flexible seating for the days you need a proper place to work. Arrive, settle in and get it done.",
    facts: [
      { label: "Location", value: LOCATION },
      { label: "Availability", value: "Talk to us about availability." },
    ],
    images: [{ src: loungeAsset.url, alt: "Shared lounge seating at Yegara Space", pos: "object-[60%_70%]" }],
    related: ["dedicated-desks", "cubicles", "cafe"],
  },
  {
    slug: "phone-booths",
    n: "05",
    name: "Phone Booths",
    tagline: "For the calls that need privacy.",
    intro: "Step away from the floor for the calls and video meetings that need a quiet, private moment.",
    facts: [
      { label: "Location", value: LOCATION },
      { label: "Availability", value: "Talk to us about availability." },
    ],
    images: [],
    related: ["meeting-rooms", "cubicles"],
  },
  {
    slug: "meeting-rooms",
    n: "06",
    name: "Meeting Rooms",
    tagline: "Where ideas get sharper.",
    intro: "Rooms for the conversations that move work forward — team sessions, client meetings and presentations.",
    facts: [
      { label: "Location", value: LOCATION },
      { label: "Availability", value: "Talk to us about availability." },
    ],
    images: [],
    related: ["boardroom", "private-offices", "phone-booths"],
  },
  {
    slug: "boardroom",
    n: "07",
    name: "Boardroom",
    tagline: "For the moments that matter most.",
    intro: "A formal setting for decisions, negotiations and the meetings you want to get exactly right.",
    facts: [
      { label: "Location", value: LOCATION },
      { label: "Availability", value: "Talk to us about availability." },
    ],
    images: [{ src: boardroomAsset.url, alt: "Yegara Space boardroom with long table and leather chairs", pos: "object-[50%_55%]" }],
    related: ["meeting-rooms", "private-offices"],
  },
  {
    slug: "cafe",
    n: "08",
    name: "In-house Café",
    tagline: "Because great work runs on great coffee.",
    intro: "Coffee, a break and an easy conversation — right inside Yegara Space.",
    facts: [{ label: "Location", value: LOCATION }],
    images: [
      { src: cafeAsset.url, alt: "Yegara Space in-house café bar with wooden stools", pos: "object-[45%_60%]" },
      { src: loungeAsset.url, alt: "Lounge seating next to the café at Yegara Space", pos: "object-[70%_80%]" },
    ],
    related: ["hot-desks", "dedicated-desks"],
  },
];

export const getSpace = (slug: string) => spaces.find((s) => s.slug === slug);
