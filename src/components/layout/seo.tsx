import Head from 'next/head';

interface Props {
  title: string;
}

export function SEO({ title }: Props) {
  return (
    <Head>
      <link rel='icon' href='/favicon.ico' />
      <link rel='apple-touch-icon' href='/icon.png' />
      <link rel='shortcut icon' href='/icon.png' />

      <meta name='description' content='약속 잡기 캘린더 - YAKSOK' />
      <meta
        name='viewport'
        content='initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width'
      />
      <meta name='keywords' content='약속잡기,약속,캘린더' />
      <meta name='og:site_name' content='YAKSOK' />
      <meta name='og:title' content={title} />
      <meta
        name='og:description'
        content='모두 가능한 약속 시간을 알아보세요'
      />
      <meta name='og:type' content='website' />
      <meta name='og:url' content='https://yaksok.swygbro.com' />
      <meta property='og:image' content='/og.png' />

      <title>{title}</title>
    </Head>
  );
}
