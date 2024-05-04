// types/project.ts
export type ProjectScreenshots = {
  path?: string;
  mobile?: string;
  tablet?: string;
  laptop?: string;
  desktop?: string;
};

export type ProjectStatus = {
  active?: boolean;
  activeOrder?: number;
  featured?: boolean;
  featuredOrder?: number;
  webequate?: boolean;
  webequateOrder?: number;
  webequateFeatured?: boolean;
  webequateFeaturedOrder?: number;
};

export type Project = {
  // _id: string;
  id: string;
  name: string;
  type: string;
  company: string;
  thumbImage: string;
  tags: string;
  description: string;
  mainImage: string;
  details?: string;
  link?: string;
  screenshots?: ProjectScreenshots;
  status?: ProjectStatus;
};
