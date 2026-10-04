import desksAsset from "@/assets/yegara-desks.jpg.asset.json";
import officeOneAsset from "@/assets/yegara-office-one.jpg.asset.json";
import officeExecAsset from "@/assets/yegara-office-exec.jpg.asset.json";
import boardroomAsset from "@/assets/yegara-boardroom.jpg.asset.json";
import loungeAsset from "@/assets/yegara-lounge.jpg.asset.json";
import cafeAsset from "@/assets/yegara-cafe.jpg.asset.json";
import hotDesksAsset from "@/assets/yegara-hot-desks.png.asset.json";
import meetingSpacesAsset from "@/assets/yegara-meeting-spaces.png.asset.json";
import phoneBoothsAsset from "@/assets/yegara-phone-booths.png.asset.json";

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
    related: ["hot-desks", "private-offices", "phone-booths"],
  },
  {
    slug: "hot-desks",
    n: "03",
    name: "Hot Desks",
    tagline: "A flexible place to land, focus and move your day forward.",
    intro: "Choose a comfortable place in Yegara's shared workspace whenever you need a productive change of scene. Hot Desks give independent professionals, founders and visiting team members the freedom to arrive, settle in and work alongside a lively community—without committing to the same desk every day.",
    facts: [
      { label: "Location", value: LOCATION },
      { label: "Availability", value: "Talk to us about availability." },
    ],
    images: [{ src: hotDesksAsset.url, alt: "Flexible hot desk seating in the bright shared workspace at Yegara Space", pos: "object-center" }],
    related: ["dedicated-desks", "phone-booths", "cafe"],
  },
  {
    slug: "phone-booths",
    n: "04",
    name: "Phone Booths",
    tagline: "A private pause for calls that need your full attention.",
    intro: "Step away from the energy of the shared floor when a conversation calls for privacy and focus. Yegara's enclosed Phone Booths give you a dedicated setting for one-to-one calls, virtual meetings and moments when you need to speak without distracting the people working around you.",
    facts: [
      { label: "Location", value: LOCATION },
      { label: "Availability", value: "Talk to us about availability." },
    ],
    images: [{ src: phoneBoothsAsset.url, alt: "Glass-fronted private phone booths at Yegara Space", pos: "object-center" }],
    related: ["meeting-rooms", "hot-desks", "dedicated-desks"],
  },
  {
    slug: "meeting-rooms",
    n: "05",
    name: "Meeting Rooms",
    tagline: "Where conversations become decisions and ideas move forward.",
    intro: "Bring people together in a considered setting made for productive conversation. From collaborative team sessions and focused planning to client meetings and presentations, Yegara's Meeting Rooms create the separation and professional atmosphere your group needs to stay present and make progress.",
    facts: [
      { label: "Location", value: LOCATION },
      { label: "Availability", value: "Talk to us about availability." },
    ],
    images: [{ src: meetingSpacesAsset.url, alt: "Bright meeting spaces with round tables and comfortable chairs at Yegara Space", pos: "object-center" }],
    related: ["boardroom", "private-offices", "phone-booths"],
  },
  {
    slug: "boardroom",
    n: "06",
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
    n: "07",
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
