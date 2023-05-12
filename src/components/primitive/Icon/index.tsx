import { CalendarIcon } from '@/components/primitive/icon/calendar-icon';
import { CaretDownIcon } from '@/components/primitive/icon/caret-down-icon';
import { CaretRightIcon } from '@/components/primitive/icon/caret-right-icon';
import { CaretUpIcon } from '@/components/primitive/icon/caret-up-icon';
import { MoonIcon } from '@/components/primitive/icon/moon-icon';
import { PersonIcon } from '@/components/primitive/icon/person-icon';
import { RefreshIcon } from '@/components/primitive/icon/refresh-icon';
import { ShareIcon } from '@/components/primitive/icon/share-icon';
import { SunIcon } from '@/components/primitive/icon/sun-icon';

import type { IconType } from '@/types/icon.type';
// add new icons here
const iconMap = {
  'calendar': CalendarIcon,
  'caret-down': CaretDownIcon,
  'caret-right': CaretRightIcon,
  'caret-up': CaretUpIcon,
  'moon': MoonIcon,
  'person': PersonIcon,
  'refresh': RefreshIcon,
  'share': ShareIcon,
  'sun': SunIcon,
};

export type IconName = keyof typeof iconMap;

interface IconProps extends IconType {
  name: IconName;
}

export const Icon = ({ name, size = 20 }: IconProps) => {
  const IconComponent = iconMap[name];
  return <IconComponent size={size} />;
};
