import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Hello Next</title>
        <meta name="viewport" content="initial-scale=1.5, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
