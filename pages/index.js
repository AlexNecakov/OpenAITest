import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [textInput, setTextInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setTextInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>JARVIS</title>
        <link rel="icon" href="/green.gif" />
      </Head>

      <main className={styles.main}>
        <img src="/green.gif" className={styles.icon} />
        <h3>Ask a question</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Enter text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <input type="submit" value="Submit" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
