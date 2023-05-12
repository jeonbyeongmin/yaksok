import { darkTheme, styled } from '@/styles/stitches.config';

const Table = styled('table', {
  'userSelect': 'none',
  'width': '$full',
  'backgroundColor': '$panel',
  'borderCollapse': 'collapse',
  'borderSpacing': 0,
  'borderRadius': '$2xl',
  'overflow': 'hidden',

  '& th': {
    borderBottom: '1px solid',
  },

  '& th, & td': {
    'borderColor': '$gray200',
    'padding': '$4 $3',

    '&:not(:last-child)': {
      borderRight: '1px solid $gray200',
    },

    [`.${darkTheme} &`]: {
      borderColor: '$gray700',
    },
  },
});

const THead = styled('thead', {});
const TBody = styled('tbody', {});

const TR = styled('tr', {});

const TH = styled('th', {
  verticalAlign: 'top',
});

const TD = styled('td', {
  'borderBottom': '1px solid',

  'h': '$25',

  '@bp1': { h: '$18' },

  'variants': {
    isEven: {
      true: {
        borderBottom: '1px dashed',
      },
    },
    clickable: {
      true: {
        'cursor': 'pointer',
        '&:hover': {
          backgroundColor: '$gray100',
        },
        [`.${darkTheme} &`]: {
          '&:hover': {
            backgroundColor: '$gray800',
          },
        },
      },
    },

    active: {
      true: {
        backgroundColor: '$lighten200',
        [`.${darkTheme} &`]: {
          backgroundColor: '$primary200',
        },
      },
    },
  },

  'compoundVariants': [
    {
      clickable: true,
      active: true,
      css: {
        '&:hover': {
          backgroundColor: '$lighten200',
        },
        [`.${darkTheme} &`]: {
          '&:hover': {
            backgroundColor: '$primary200',
          },
        },
      },
    },
  ],
});

export { Table, THead, TBody, TR, TH, TD };
