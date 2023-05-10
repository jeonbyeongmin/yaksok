import { css, styled } from '@/styles/stitches.config';

export const overlayStyles = css({
  bgColor: 'rgba(0, 0, 0, .6)',
  backdropFilter: 'blur(8px)',
});

export const Overlay = styled('div', overlayStyles);
