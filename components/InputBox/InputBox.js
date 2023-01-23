import { useState, useRef } from "react";

import styles from "./InputBox.module.css"

const InputBox = ({textInput, setTextInput}) => {
  const timeout = useRef()
  const [isGenerating, setIsGenerating] = useState(false);

  const handleTextInputChange = (e) => {
    setTextInput(prev => {
      return e.target.value;
    })
  }

  const handleTextExampleGenerate = () => {
    clearTimeout(timeout.current);
    setIsGenerating(true);
    timeout.current = setTimeout(async () => {
      const res = await fetch('/api/example', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json();
      setTextInput(data.output.trim());
      setIsGenerating(false);
    }, 2000)
  }

  return (
    <div className={styles.textBox}>
        <div className={styles.boxHeader}>
          <label htmlFor="textInput">Text Input (Required)</label>
        </div>
        <div className={styles.boxBody}>
            <textarea id="textInput" className={styles.textArea} value={isGenerating ? "Generating..." : textInput} maxLength={255} onChange={handleTextInputChange} />
        </div>
        <div className={styles.boxFooter}>
          <p onClick={handleTextExampleGenerate}>{!isGenerating ? "Generate an example" : "Generating!"}</p>
          <p>{textInput.length}/255</p>
        </div>
    </div>
  )
}

export default InputBox;