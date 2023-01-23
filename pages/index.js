import { useEffect, useState } from 'react'
import Script from 'next/script'

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
        <title>ToGenre - Top AI Powered Text To Literary Genres Converter</title>
        <meta name="description" content="Convert your text to many different literary genres! Thanks to the AI behind the scenes, different text is returned upon each text conversion, so you can get quality genre literature." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name='language' content='English' />
        <meta name="author" content='Voldemar Ezerin'/>
        <meta property='og:title' content='ToGenre - AI Powered Literary Genre Converter' />
        <meta property='og:url' content='togenre.com' />
        <meta property='og:description' content='Convert your text to many different literary genres! Thanks to the AI behind the scenes, different text is returned upon each text conversion, so you can get quality genre literature.' />
        <meta property='og:image' content='/page.png'/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4914934905972625" crossorigin="anonymous" ></Script>
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
