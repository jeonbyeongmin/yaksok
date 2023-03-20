import { CalendarIcon } from '@/components/primitive/Icon/CalendarIcon';
import { CaretDownIcon } from '@/components/primitive/Icon/CaretDownIcon';
import { CaretRightIcon } from '@/components/primitive/Icon/CaretRightIcon';
import { CaretUpIcon } from '@/components/primitive/Icon/CaretUpIcon';
import { MoonIcon } from '@/components/primitive/Icon/MoonIcon';
import { PersonIcon } from '@/components/primitive/Icon/PersonIcon';
import { RefreshIcon } from '@/components/primitive/Icon/RefreshIcon';
import { ShareIcon } from '@/components/primitive/Icon/ShareIcon';
import { SunIcon } from '@/components/primitive/Icon/SunIcon';

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

export const Icon = ({ name, size = 20 }: IconProps) => {
  const IconComponent = iconMap[name];
  return <IconComponent size={size} />;
};
