import { useEffect, useState } from 'react'

import Head from 'next/head'
import styles from '@/styles/Home.module.css'

import InputBox from '@/components/InputBox'
import OutputBox from '@/components/OutputBox'
import Genre from '@/components/Genre'

import genres from '@/lib/genres'

export default function Home() {
  
  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!textInput) {
      return;
    }

    setIsGenerating(true);
    const generateGenreText = async () => {
      const res = await fetch('/api/genres', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ textInput, selectedGenre }),
      })
      const data = await res.json();
      setTextOutput(data.output.trim());
      setIsGenerating(false);
    }

    const delay = setTimeout(generateGenreText, 1000);

    return () => {
      clearTimeout(delay);
    }
  }, [selectedGenre])

  return (
    <>
      <Head>
        <title>ToGenre</title>
        <meta name="description" content="Convert text to other literary genres!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={`${styles.header} ${styles.cssTyping}`} >
          <h1>ToGenre</h1>
          <p>convert text to other literary genres!</p>
        </div>
        <div className={styles.content}>
          <InputBox textInput={textInput} setTextInput={setTextInput} />
          <OutputBox textInput={textInput} textOutput={textOutput} setTextOutput={setTextOutput} genre={selectedGenre} isGenerating={isGenerating} setIsGenerating={setIsGenerating} />
        </div>
        <div className={styles.genres}>
          {genres.map((genre, i) => {
            return (
              <Genre key={i} name={genre.name} imageSrc={genre.imageSrc} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
            )
          })}
        </div>
      </main>
    </>
  )
}
