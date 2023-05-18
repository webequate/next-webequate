// types/experience.ts
export type School = {
  _id: string;
  school: string;
  program: string;
  city: string;
  endDate: string;
  order: number;
};

export type Job = {
  _id: string;
  company: string;
  role: string;
  city: string;
  startDate: string;
  endDate: string;
  achievements: string[];
  order: number;
};
