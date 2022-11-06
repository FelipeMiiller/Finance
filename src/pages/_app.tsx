import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider as ProviderNexAuth  } from "next-auth/react"

export default function App({ Component, pageProps }: AppProps) {
  return  (
    <>
    <ProviderNexAuth session={pageProps.session}>
      <Component {...pageProps} />
      </ProviderNexAuth>
    </>
  );
}
