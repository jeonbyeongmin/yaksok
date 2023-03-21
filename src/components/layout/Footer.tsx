import { Flex, Text } from '@/components/primitive';
import { darkTheme, styled } from '@/styles/stitches.config';

import Image from 'next/image';

function Footer() {
  return (
    <FooterWrapper>
      <FooterInner align="center" gap={5}>
        <Image src="/logo.svg" alt="logo" width={100} height={30} />
        <Divider />
        <CopyRight>
          <Text content="&copy;" size="xs" />
          <Text content={`${new Date().getFullYear()} YAKSOK. All right reserved.`} size="xs" />
        </CopyRight>
        <Divider />
        <MadeBy direction="column" gap={2}>
          <Person gap={5}>
            <Text content="Developer" size="xs" css={{ w: '$28' }} />
            <Text content="전병민" size="xs" css={{ w: '$17' }} />
            <a href="mailto:qudals7613@gmail.com">
              <Text content="qudals7613@gmail.com" size="xs" />
            </a>
          </Person>
          <Person gap={5}>
            <Text content="Designer" size="xs" css={{ w: '$28' }} />
            <Text content="안혜진" size="xs" css={{ w: '$17' }} />
            <a href="mailto:kowahj@naver.com">
              <Text content="kowahj@naver.com" size="xs" />
            </a>
          </Person>
        </MadeBy>
      </FooterInner>
    </FooterWrapper>
  );
}

const FooterWrapper = styled('footer', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  w: '$full',
  px: '$10',
  py: '$8',
  userSelect: 'none',
  background: '$panel',
  borderTop: '1px solid $gray200',

  [`.${darkTheme} &`]: {
    borderTop: '1px solid $gray600',
  },
});

const FooterInner = styled(Flex, {
  color: '$darken100',
  flexDirection: 'column',

  '@bp1': { flexDirection: 'column' },
  '@bp2': { flexDirection: 'column' },
  '@bp3': { flexDirection: 'row' },

  [`.${darkTheme} &`]: {
    color: '$primary300',
  },
});

const CopyRight = styled(Flex, {
  fontSize: '$xs',
});

const Divider = styled(Flex, {
  w: '1px',
  h: '1rem',
  bgColor: '$darken100',
  mx: '$5',
  display: 'none',
  '@bp1': { display: 'none' },
  '@bp2': { display: 'none' },
  '@bp3': { display: 'block' },

  [`.${darkTheme} &`]: {
    bgColor: '$primary300',
  },
});

const MadeBy = styled(Flex, {
  fontSize: '$xs',
  a: {
    color: '$darken100',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },

    [`.${darkTheme} &`]: {
      color: '$primary300',
    },
  },

  display: 'none',
  '@bp1': { display: 'none' },
  '@bp2': { display: 'none' },
  '@bp3': { display: 'block' },
});

const Person = styled(Flex, {});

export default Footer;
