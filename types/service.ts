// types/service.ts
export type Service = {
  // _id: string;
  id: string;
  title: string;
  description: string;
  icon: string;
  status: {
    active: boolean;
    activeOrder: number;
    featured: boolean;
    featuredOrder: number;
  };
};
