import Head from "next/head";
import Form from "../components/Form";

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

      <Form />
    </div>
  );
}
