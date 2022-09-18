import { Web3Provider } from "@components";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { Layout } from "@layouts";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { defaultTheme } from "@styles";
import createEmotionCache from "@styles/createEmotionCache";
import { default as NextHead } from "next/head";
import type { AppProps } from "next/app";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={defaultTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Web3Provider>
          <NextHead>
            <base href="/" />
            <meta charSet="utf-8" />
            <title>Straps - A decentralized supply chain</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover"
            />
          </NextHead>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Web3Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
