import {
  CalendarIcon,
  CaretDownIcon,
  CaretRightIcon,
  CaretUpIcon,
  MoonIcon,
  PersonIcon,
  RefreshIcon,
  ShareIcon,
  SunIcon,
} from '@/components/icons';

// add new icons here
const iconMap = {
  calendar: CalendarIcon,
  'caret-down': CaretDownIcon,
  'caret-right': CaretRightIcon,
  'caret-up': CaretUpIcon,
  moon: MoonIcon,
  person: PersonIcon,
  refresh: RefreshIcon,
  share: ShareIcon,
  sun: SunIcon,
};

export type IconName = keyof typeof iconMap;

interface IconProps {
  name: IconName;
  size?: number;
}

export const Icon = ({ name, size }: IconProps) => {
  const IconComponent = iconMap[name];
  return <IconComponent size={size} />;
};
