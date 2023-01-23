import styles from "./Genre.module.css"

const Genre = ({name, imageSrc, selectedGenre, setSelectedGenre}) => {

  const handleGenreSelect = () => {
    if (selectedGenre == name) {
      return;
    }

    setSelectedGenre(prev => {
      return name;
    })
  }

  return (
    <div className={styles.genre}
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        backgroundBlendMode: "overlay",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      onClick={handleGenreSelect}
    >
      <p className={styles.genreName}>{`${name[0].toUpperCase()}${name.slice(1)}`}</p>
    </div>
  )
}

export default Genre;