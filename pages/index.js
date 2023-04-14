import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Branding App</title>
        <meta
          name="description"
          content="Branding application powered by ChatGPT."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <button>Test</button>
    </div>
  );
}
