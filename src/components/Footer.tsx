import { Flex } from '@/components/primitive/Flex';
import { Logo } from '@/components/assets/Logo';
import { Text } from '@/components/primitive/Text';
import { styled } from '@/styles/stitches.config';

function Footer() {
  return (
    <FooterWrapper>
      <FooterInner align="center">
        <Logo />
        <Divider />
        <CopyRight>
          <Text content="&copy;" size="xs" />
          <Text
            content={`${new Date().getFullYear()} YAKSOK Inc. All right reserved.`}
            size="xs"
          />
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
  h: '$40',
  px: '$10',
  userSelect: 'none',
  bgColor: '$white',
  borderTop: '1px solid $gray200',
});

const FooterInner = styled(Flex, {
  // minW: '$500',
});

const CopyRight = styled(Flex, {
  fontSize: '$xs',
  color: '$darken100',
});

const Divider = styled(Flex, {
  w: '1px',
  h: '1rem',
  bgColor: '$gray200',
  mx: '$10',
});

const MadeBy = styled(Flex, {
  fontSize: '$xs',
  color: '$darken100',
  a: {
    color: '$darken200',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

const Person = styled(Flex, {});

export default Footer;
