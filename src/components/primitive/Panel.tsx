import { css, styled } from '@/styles/stitches.config';

export const panelStyles = css({
  bgColor: '$white',
  br: '$md',
  boxShadow: 1,
});

export const Panel = styled('div', panelStyles);
