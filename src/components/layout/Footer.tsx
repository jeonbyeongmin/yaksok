import { darkTheme, styled } from '@/styles/stitches.config';

import { Flex } from '@/components/primitive/Flex';
import { Logo } from '@/components/assets/Logo';
import { Text } from '@/components/primitive/Text';

function Footer() {
  return (
    <FooterWrapper>
      <FooterInner align="center">
        <Logo />
        <Divider />
        <CopyRight>
          <Text content="&copy;" size="xs" />
          <Text content={`${new Date().getFullYear()} YAKSOK. All right reserved.`} size="xs" />
        </CopyRight>
        <Divider />
        <MadeBy direction="column" gap={2}>
          <Person gap={5}>
            <Text content="Developer 전병민" size="xs" />
            <a href="mailto:qudals7613@gmail.com">
              <Text content="qudals7613@gmail.com" size="xs" />
            </a>
          </Person>
          <Person gap={5}>
            <Text content="Designer 안혜진" size="xs" />
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
  py: '$3',
  userSelect: 'none',
  background: '$panel',
  borderTop: '1px solid $gray200',

  [`.${darkTheme} &`]: {
    borderTop: '1px solid $gray600',
  },
});

const FooterInner = styled(Flex, {
  color: '$darken100',

  [`.${darkTheme} &`]: {
    color: '$primary',
  },
});

const CopyRight = styled(Flex, {
  fontSize: '$xs',
});

const Divider = styled(Flex, {
  w: '1px',
  h: '1rem',
  bgColor: '$darken100',
  mx: '$10',

  [`.${darkTheme} &`]: {
    bgColor: '$primary',
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
      color: '$primary',
    },
  },
});

const Person = styled(Flex, {});

export default Footer;
