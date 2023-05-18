// types/basics.ts
export type SocialLink = {
  name: string;
  handle: string;
  url: string;
};

export type Basics = {
  _id: string;
  name: string;
  titles: string[];
  summaryItems: string[];
  aboutIntro: string;
  aboutItems: string[];
  resumeLink: string;
  socialLinks: SocialLink[];
  location: string;
  phone: string;
  website: string;
  contactIntro: string;
};
