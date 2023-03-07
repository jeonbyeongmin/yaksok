import { IconProps } from '@/components/assets/common/iconTypes';

export function CaretRightIcon({ size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.9004 12.0002C15.9004 12.2654 15.795 12.5198 15.6075 12.7073L10.8075 17.5073C10.417 17.8978 9.78381 17.8978 9.39328 17.5073C9.00276 17.1168 9.00276 16.4836 9.39328 16.0931L13.4862 12.0002L9.39328 7.9073C9.00276 7.51678 9.00276 6.88361 9.39328 6.49309C9.78381 6.10256 10.417 6.10256 10.8075 6.49309L15.6075 11.2931C15.795 11.4806 15.9004 11.735 15.9004 12.0002Z"
        fill="currentColor"
      />
    </svg>
  );
}
