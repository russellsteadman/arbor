import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import App from "@/app/main";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Arbor | Concept Maps</title>
        <meta
          name="description"
          content="Arbor is a web-based concept mapping tool. It is designed to be simple and easy to use, while still providing a powerful set of features."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <App />
      </main>
    </>
  );
}
