import { IconProps } from '@/types/icon-type';

export function CalendarIcon({ size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.5791 5.08999V0H8.4541V5.08999H6.5791ZM21.6724 5.08999V0H23.5474V5.08999H21.6724Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.125 7.41669C28.125 6.89892 27.7053 6.47919 27.1875 6.47919H2.8125C2.29473 6.47919 1.875 6.89892 1.875 7.41669V30.8038C1.875 31.3216 2.29473 31.7413 2.8125 31.7413H27.1875C27.7053 31.7413 28.125 31.3216 28.125 30.8038V7.41669ZM1.875 4.60419C0.839466 4.60419 0 5.44365 0 6.47919V31.7413C0 32.7769 0.839466 33.6163 1.875 33.6163H28.125C29.1605 33.6163 30 32.7769 30 31.7413V6.47919C30 5.44365 29.1605 4.60419 28.125 4.60419H1.875Z"
        fill="currentColor"
      />
      <path d="M5.40918 13.0921H8.05402V15.7369H5.40918V13.0921Z" fill="currentColor" />
      <path d="M13.6777 13.0921H16.3226V15.7369H13.6777V13.0921Z" fill="currentColor" />
      <path d="M21.9473 13.0921H24.5921V15.7369H21.9473V13.0921Z" fill="currentColor" />
      <path d="M21.9473 23.2366H24.5921V25.8814H21.9473V23.2366Z" fill="currentColor" />
      <path d="M13.6777 23.2366H16.3226V25.8814H13.6777V23.2366Z" fill="currentColor" />
      <path d="M5.40918 23.2361H8.05402V25.881H5.40918V23.2361Z" fill="currentColor" />
    </svg>
  );
}
