// types/service.ts
export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string; // Icon string, e.g., "FaCode"
  status: {
    active: boolean;
    activeOrder: number;
    featured: boolean;
    featuredOrder: number;
  };
};
