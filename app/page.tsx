import Header from 'app/components/Header'
import Board from 'app/components/Board'
import Keyboard from './components/Keyboard'

const getWords = async () => {
  const res = await fetch('https://gitlab.com/d2945/words/-/raw/main/words.txt')
  const words = await res.text()
  return words
}

const parseDictionary = (str: string) => {
  return str.split('\n').filter((w) => w.length === 5)
}

export default async function HomePage () {
  const words = await getWords()
  const dictionary = parseDictionary(words)

  return (
    <>
      <Header />
      <Board dictionary={dictionary} />
      <Keyboard />
    </>
  )
}
