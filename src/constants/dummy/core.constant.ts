import { AvatarGroupType } from "@/components/core/AvatarGroups";

type FooterMenuItemType = {
  label: string;
  slug: string;
};

type FooterMenuType = {
  [key: string]: FooterMenuItemType[];
};

export const FOOTER_MENUS: FooterMenuType = {
  "Customer Services": [
    { label: "Contact Us", slug: "contact-us" },
    { label: "Email Us", slug: "email-us" },
    { label: "Live Chat", slug: "live-chat" },
  ],
  "Our Expertise": [
    { label: "Buy and Ship for Me", slug: "buy-and-ship-for-me" },
    { label: "Ship for Me", slug: "ship-for-me" },
    { label: "Request for Quotation (RFQ)", slug: "request-for-quotation" },
    { label: "Cost Calculator", slug: "cost-calculator" },
  ],
  "Important Links": [
    { label: "MoveSky Live", slug: "movesky-live" },
    { label: "Talk to The Expert", slug: "talk-to-the-expert" },
  ],
};

export const FOOTER_LEGAL_LINKS: FooterMenuItemType[] = [
  { label: "Terms & Conditions", slug: "terms-and-conditions" },
  { label: "Privacy Policy", slug: "privacy-policy" },
];


export const AVATAR_GROUP_DATA: AvatarGroupType[] = [
  {
    src: "https://github.com/evilrabbit.png",
    alt: "@evilrabbit",
    fallback: "ER",
  },
  {
    src: "https://github.com/maxleiter.png",
    alt: "@maxleiter",
    fallback: "ML",
  },
  {
    src: "https://github.com/shadcn.png",
    alt: "@shadcn",
    fallback: "CN",
  },
  {
    src: "https://github.com/maxleiter.png",
    alt: "@maxleiter",
    fallback: "ML",
  },
  {
    src: "https://github.com/evilrabbit.png",
    alt: "@evilrabbit",
    fallback: "ER",
  },
]