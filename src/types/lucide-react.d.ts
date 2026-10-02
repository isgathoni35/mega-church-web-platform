import * as React from "react";

declare module "lucide-react" {
  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    className?: string;
  }
  export type LucideIcon = React.ForwardRefExoticComponent<
    LucideProps & React.RefAttributes<SVGSVGElement>
  >;

  export const Heart: LucideIcon;
  export const Play: LucideIcon;
  export const Calendar: LucideIcon;
  export const Smartphone: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const Check: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const Menu: LucideIcon;
  export const X: LucideIcon;
  export const Clock: LucideIcon;
  export const MapPin: LucideIcon;
  export const Phone: LucideIcon;
  export const Mail: LucideIcon;
  export const Shield: LucideIcon;
  export const Video: LucideIcon;
  export const Radio: LucideIcon;
  export const Share2: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const Search: LucideIcon;
  export const Users: LucideIcon;
  export const Globe: LucideIcon;
  export const Award: LucideIcon;
  export const Sparkles: LucideIcon;
  export const BookOpen: LucideIcon;
  export const Flame: LucideIcon;
  export const Building2: LucideIcon;
  export const Bell: LucideIcon;
  export const Quote: LucideIcon;
  export const Zap: LucideIcon;
}
