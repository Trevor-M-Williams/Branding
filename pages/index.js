import Head from "next/head";
import Form from "../components/Form";
import StyleGuide from "../components/StyleGuide";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

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

      {data ? <StyleGuide data={data} /> : <Form setData={setData} />}
    </div>
  );
}
