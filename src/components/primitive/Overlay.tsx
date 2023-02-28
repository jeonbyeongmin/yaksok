import { css, styled } from '@/styles/stitches.config';

export const overlayStyles = css({
  bgColor: 'rgba(0, 0, 0, .5)',
  backdropFilter: 'blur(5px)',
});

export const Overlay = styled('div', overlayStyles);
