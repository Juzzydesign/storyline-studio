export type ProjectColor =
  | "slate"
  | "blue"
  | "teal"
  | "amber"
  | "rose"
  | "violet";

export interface Design {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  color: ProjectColor;
  createdAt: string;
  updatedAt: string;
  designs: Design[];
}

export const PROJECT_COLORS: Record<
  ProjectColor,
  { label: string; bg: string; icon: string; soft: string }
> = {
  slate: {
    label: "Slate",
    bg: "bg-[#8E8E93]",
    icon: "text-[#636366]",
    soft: "bg-[#F2F2F7]",
  },
  blue: {
    label: "Blue",
    bg: "bg-[#007AFF]",
    icon: "text-[#007AFF]",
    soft: "bg-[#E8F1FF]",
  },
  teal: {
    label: "Teal",
    bg: "bg-[#5AC8FA]",
    icon: "text-[#32ADE6]",
    soft: "bg-[#E6F7FC]",
  },
  amber: {
    label: "Amber",
    bg: "bg-[#FF9F0A]",
    icon: "text-[#FF9500]",
    soft: "bg-[#FFF4E5]",
  },
  rose: {
    label: "Rose",
    bg: "bg-[#FF2D55]",
    icon: "text-[#FF2D55]",
    soft: "bg-[#FFE8EE]",
  },
  violet: {
    label: "Violet",
    bg: "bg-[#AF52DE]",
    icon: "text-[#AF52DE]",
    soft: "bg-[#F5E8FB]",
  },
};
