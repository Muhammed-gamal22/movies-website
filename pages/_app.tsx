import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <AnimatePresence mode="wait">
      <Component {...pageProps} key={router.pathname} />
    </AnimatePresence>
  );
}

export default MyApp;
