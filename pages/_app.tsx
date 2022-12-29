import { AppProps } from 'next/dist/shared/lib/router/router';
import Head from 'next/head';
import '../styles/globals.css';
import ym from 'react-yandex-metrika';
import { YMInitializer } from 'react-yandex-metrika';

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  router.events.on('routeChangeComplete', (url: string) => {
    if(typeof window !== 'undefined') {
      ym('hit', url);
    }
  });


  return <>
    <Head>
      <title>MyTop - The best top</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
      <link rel="preconnect" href="https://mc.yandex.ru" />
      <meta property='og:url' content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}/>
      <meta property='og:locale' content={'ru_RU'} />
    </Head>
    <YMInitializer 
      accounts={[]}
      options={{webvisor: true, defer: true}}
      version='2'
    />
    <Component {...pageProps} />
  </>;
}

export default MyApp;
