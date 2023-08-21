import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          href="/favicon/apple-touch-icon.png"
          type="image/png"
          sizes="32x32"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
