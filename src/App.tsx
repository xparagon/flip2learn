import { useEffect, useState } from 'react'
import './App.css'
import CountUp from './component/CountUp'
import EditWordlist from './component/EditWordlist'
import FlipWord from './component/FlipWord'
import HowToUse from './component/HowToUse'
import ReportResults from './component/ReportResults'
import SelectLabelLanguage from './component/SelectLabelLanguage'
import StatusBar from './component/StatusBar'
import { Labels, Result, Word } from './types'

function App() {
  const [edit, setEdit] = useState(false)
  const [done, setDone] = useState(false)
  const [check, setCheck] = useState(false)
  const [countNo, setCountNo] = useState(0)
  const [countYes, setCountYes] = useState(0)
  const [count, setCount] = useState(0)
  const [language, setLanguage] = useState(1)

  const [words, setWords] = useState<Word[]>([
    { word: '?', meaning: '!', isKnown: false },
  ])

  const [progress, setProgress] = useState<Result[]>([])

  const languages = ['English', 'українська', 'عربي', '❖']
  const labels: Labels = {
    doKnow: ['I know this', 'я знаю, що це', 'انا اعرف هذا', '✔'],
    doNotKnow: ['Don\'t know', 'не знаю', 'لا أعرف', '✕'],
    doAgain: ['Again', 'Знову', 'تكرارا', '♻'],
    doShuffle: ['Shuffle', 'змішувати', 'مزج', '🔀'],
    words: ['words', 'слова', 'كلمات', ''],
    howToCheck: ['Click the black box to see the word.',
      'Клацніть чорне поле, щоб побачити слово.',
      'انقر فوق المربع الأسود لرؤية الكلمة.', ''],
    howToProceed: ['Click green if you know this word, red if not.',
      'Натисніть зелений, якщо ви знаєте це слово, червоний, якщо ні.',
      'انقر فوق الأخضر إذا كنت تعرف هذه الكلمة ، وإذا لم تكن تعرفها باللون الأحمر.', ''],
    titleEditing: ['Edit the wordlist', 'Відредагуйте список слів', 'قم بتحرير قائمة الكلمات', '👄👄 → 👄👄'],
    doneEditing: ['Done', 'Готово', 'فعله', '📌'],
    doCleanup: ['Remove ✔', 'Видалити ✔', 'قم بإزالة ✔', '✂ ✅'],
    doAdd: ['Add 5', 'Додайте 5', 'أضف 5', '+ 5'],
    doExport: ['Export', 'Експорт', 'يصدّر', '↡'],
    doImport: ['Import', 'Імпорт', 'يستورد', '↟'],
    msgSaved: ['Words saved to file', 'Слова збережено у файл', 'الكلمات المحفوظة في الملف', '↡'],
    msgLoaded: ['Words loaded from file', 'Слова, завантажені з файлу', 'الكلمات التي تم تحميلها من ملف', '↟'],
    msgNoneLoaded: ['No words found in this file', 'У цьому файлі не знайдено слів', 'لا توجد كلمات وجدت في هذا الملف', '⛔'],
    msgShuffled: ['Words shuffled', 'Слова перемішувалися', 'خلط الكلمات', '🔀'],
  }


  const startwords: Word[] = [
    { word: 'Norsk', meaning: 'Norwegian', isKnown: false },
    { word: 'Hva heter du?', meaning: 'What is your name?', isKnown: false },
    { word: 'Jeg heter ...', meaning: 'My name is ...', isKnown: false },

  ]

  function maxWordsInProgress() {
    const wordCountList = progress.map(p => p.words)
    return Math.max(...wordCountList)
  }

  function progressBarWidth(points: number) {
    const max = maxWordsInProgress()

    return Math.round(points / max * 100) + '%'
  }

  function isAtTheStart() {
    return count === 0
  }

  function isAtTheEnd() {
    return count > 0 && count < words.length
  }

  function nextWord() {
    setCheck(false)
    if (count === words.length - 1) {
      // when done, calculate the result
      calculateResult()
      setDone(true)
    } else {
      setCount(count + 1)
    }
  }


  function resetScore() {
    setCount(0)
    setCountNo(0)
    setCountYes(0)
    setDone(false)
  }

  function handleNo() {
    words[count].isKnown = false;
    setCountNo(countNo + 1)
    nextWord()
  }

  function handleYes() {
    words[count].isKnown = true;
    setCountYes(countYes + 1)
    nextWord()
  }

  function handleCheck() {
    setCheck(true)
  }

  function calculateResult() {
    const known = words.filter(word => word.isKnown).length;
    const unknown = words.filter(word => !word.isKnown).length;
    const score = Math.round(known / (words.length) * 100);
    const result: Result = { known, unknown, score, words: words.length };
    // TODO: update progress
    console.log('result:', result);
    const newProgress = [result, ...progress.slice(0, 99)]
    setProgress(newProgress)
    localStorage.setItem("flip", JSON.stringify({ words, result, progress: newProgress }))
  }

  useEffect(() => {
    const saved = localStorage.getItem("flip");
    if (!saved) {
      setWords(startwords)
    } else {
      // when starting up - load words from localstorage
      const parsed = JSON.parse(saved)
      console.log('flip:', parsed);
      setWords(parsed.words)
      // TODO - load progress
      if (!parsed.progress) {
        console.log('no progress');
      } else {
        setProgress(parsed.progress)
      }
    }

  }, [])

  function openEdit() {
    setEdit(true)
  }

  function closeEdit() {
    const filtered = words.filter(word => !(word.word === '' || word.meaning === ''))
    let newWords: Word[] = []

    if (filtered.length === 0) {
      setWords(startwords)
      newWords = startwords
    } else {
      newWords = filtered
    }

    setWords(newWords) // set new words

    const known = newWords.filter(word => word.isKnown).length;
    const unknown = newWords.filter(word => !word.isKnown).length;
    const score = Math.round(known / (newWords.length) * 100);
    const result: Result = { known, unknown, score, words: newWords.length };
    // TODO: update words only!
    console.log('closeEdit - flip:', { words: newWords, result });
    localStorage.setItem("flip", JSON.stringify({ words: newWords, result, progress }))
    resetScore()
    setEdit(false)
  }

  function handleWordChange(e: React.ChangeEvent<{ value: string }>, index: number) { // e = event, index = index of word
    const newWords = [...words] // copy of words
    newWords[index].word = e.target.value // change word
    setWords(newWords) // set new words

    /*
    
    */
  }

  function handleMeaningChange(e: React.ChangeEvent<{ value: string }>, index: number) { // e = event, index = index of word
    const newWords = [...words] // copy of words
    newWords[index].meaning = e.target.value // change word
    setWords(newWords) // set new words
  }

  return (
    <div className="App">

      {edit &&
        <EditWordlist
          language={language}
          labels={labels}
          words={words}
          setWords={setWords}
          closeEdit={closeEdit}
          handleWordChange={handleWordChange}
          handleMeaningChange={handleMeaningChange}
        />
      }

      {!edit &&
        <div className='flip-app'>
          <img src="/logo.png" className="logo" alt="Språkverksted logo" onClick={() => openEdit()} />

          <CountUp
            count={count}
            totalWords={words.length}
          />
          {!done &&
            <FlipWord
              check={check}
              count={count}
              handleCheck={handleCheck}
              handleNo={handleNo}
              handleYes={handleYes}
              language={language}
              words={words}
              labels={labels}
            />

          }
          {done &&
            <ReportResults
              countNo={countNo}
              countYes={countYes}
              totalWords={words.length}
              language={language}
              labels={labels}
              doAgain={resetScore}
            />
          }
          <footer>
            {isAtTheStart() &&
              <HowToUse
                language={language}
                labels={labels}
              />
            }
            {isAtTheEnd() &&
              <StatusBar
                countNo={countNo}
                countYes={countYes}
                totalWords={words.length}
              />
            }
          </footer >

          <SelectLabelLanguage
            languages={languages}
            language={language}
            setLanguage={setLanguage}
          />
          <hr />
          <div className='progress'>

            <div className='progress-list'>
              {progress.map((result, index) => (
                <div className='progress-item' key={index}>
                  <div className='progress-item-unknown-column'>
                    <div className="isNo progress-item-bar"
                      style={{ width: progressBarWidth(result.unknown) }}

                    ></div>


                  </div>
                  <div className='progress-item-known-column'
                  >
                    <div className="isYes progress-item-bar"
                      style={{ width: progressBarWidth(result.known) }}
                    ></div>
                  </div>

                </div>
              ))}
            </div>
          </div>


          <hr />
          <details>
            <summary>This is just a prototype</summary>
            <div className='about-box'>
              Version 0.4 - 16.01.2023<br />
              Please suggest features to <a href="mailto:fredpallesen@gmail.com">Fred</a><br />
              or add an issue to the <a href="https://github.com/xparagon/flip2learn/issues">GitHub repo</a>.
            </div>
          </details>
          <div className='download-links'>
            <p>
              <a href="https://drive.google.com/drive/folders/1wmoP__LmyQBw0m8bkfWY1MPlxXVDUaZ5?usp=sharing" >Download Flips</a>
            </p>
          </div>
        </div>
      }
    </div >

  )
}

export default App
