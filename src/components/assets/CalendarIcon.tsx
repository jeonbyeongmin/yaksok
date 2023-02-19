import { IconProps } from '@/components/assets/common/iconTypes';
import { Path } from '@/components/assets/common/iconStyle';

export function CalendarIcon({ size = 20, color = 'darken300' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.7725 14.2867V7.5H21.2725V14.2867H18.7725ZM38.8968 14.2867V7.5H41.3968V14.2867H38.8968Z"
        color={color}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M47.5 17.3892C47.5 16.6988 46.9404 16.1392 46.25 16.1392H13.75C13.0596 16.1392 12.5 16.6988 12.5 17.3892V48.572C12.5 49.2624 13.0596 49.822 13.75 49.822H46.25C46.9404 49.822 47.5 49.2624 47.5 48.572V17.3892ZM12.5 13.6392C11.1193 13.6392 10 14.7584 10 16.1392V49.822C10 51.2027 11.1193 52.322 12.5 52.322H47.5C48.8807 52.322 50 51.2027 50 49.822V16.1392C50 14.7584 48.8807 13.6392 47.5 13.6392H12.5Z"
        color={color}
      />
      <Path
        d="M17.2109 24.9556H20.7374V28.482H17.2109V24.9556Z"
        color={color}
      />
      <Path
        d="M28.2363 24.9556H31.7628V28.482H28.2363V24.9556Z"
        color={color}
      />
      <Path
        d="M39.2627 24.9556H42.7892V28.482H39.2627V24.9556Z"
        color={color}
      />
      <Path
        d="M39.2627 38.4819H42.7892V42.0084H39.2627V38.4819Z"
        color={color}
      />
      <Path
        d="M28.2373 38.4819H31.7638V42.0084H28.2373V38.4819Z"
        color={color}
      />
      <Path
        d="M17.2109 38.4814H20.7374V42.0079H17.2109V38.4814Z"
        color={color}
      />
    </svg>
  );
}
