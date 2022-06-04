/* import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (<Component {...pageProps} />); 
}

export default MyApp
 */

import { AppProps } from "next/app";
// import { useEffect } from "react";
// import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  // const router = useRouter();
  // useEffect(() => {
  //   router.push("/");
  // }, []);

  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : <Component {...pageProps} />}
    </div>
  );
}
export default MyApp;
