import { useRef, useState } from "react";

import styles from "./OutputBox.module.css"

const OutputBox = ({textInput, textOutput, setTextOutput, genre, isGenerating, setIsGenerating}) => {
  const timeout = useRef();

  const [isCoppied, setIsCoppied] = useState(false); 
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleTextCopy = async () => {
    setIsCoppied(true);
    setTimeout(() => {
      setIsCoppied(false);
    }, 1000)

    try {
      await navigator.clipboard.writeText(textOutput);
      console.log("Coppied!");
    } catch (err) {
      console.error("Copy failed!, err: ", err)
    }

  }

  const handleTextRegenerate = () => {
    clearTimeout(timeout.current);

    if (!textInput) {
      return;
    }

    setIsRegenerating(true);
    setIsGenerating(true);
    timeout.current = setTimeout(async () => {
      const res = await fetch('/api/genres', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ textInput, selectedGenre: genre }),
      })
      const data = await res.json();
      setTextOutput(data.output.trim());
      setIsGenerating(false);
      setIsRegenerating(false);
    }, 2000)
  }

  return (
    <div className={styles.textBox}>
        <div className={styles.boxHeader}>
          <label htmlFor="textOutput">Text Output</label>
          <p>[{genre ? genre : "random"} genre]</p>
        </div>
        <div className={styles.boxBody}>
            <textarea id="textOutput" className={styles.textArea} value={isGenerating ? "Generating..." : textOutput} readOnly={true} />
        </div>
        <div className={styles.boxFooter}>
          <p className={styles.copy} onClick={handleTextCopy}>{!isCoppied ? "Copy" : "Coppied!"}</p>
          <p className={styles.regenerate} onClick={handleTextRegenerate}>{!isRegenerating ? "Regenerate" : "Regenerating!" }</p>
          <p>{textOutput && textOutput.length}</p>
        </div>
    </div>
  )
}

export default OutputBox;