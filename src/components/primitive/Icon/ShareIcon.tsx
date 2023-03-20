import { IconProps } from '@/types/icon-type';

export function ShareIcon({ size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_695_2950)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.6694 18.905L18.2558 5.52041L4.87119 9.1068L14.6694 18.905ZM19.3623 5.81691C19.5906 4.96509 18.8111 4.18561 17.9593 4.41386L4.57469 8.00025C3.72287 8.22849 3.43756 9.29327 4.06114 9.91685L13.8593 19.715C14.4829 20.3386 15.5477 20.0533 15.7759 19.2015L19.3623 5.81691Z"
          fill="currentColor"
        />
        <path
          d="M9.24805 13.7266L12.8935 10.0811C13.1172 9.85742 13.4838 9.8614 13.7075 10.0851C13.9312 10.3088 13.9352 10.6754 13.7115 10.8991L10.0661 14.5446L9.24805 13.7266Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
