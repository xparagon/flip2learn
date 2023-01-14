import { useEffect, useState } from 'react'
import './App.css'
import CountUp from './component/CountUp'
import FlipWord from './component/FlipWord'
import HowToUse from './component/HowToUse'
import ReportResults from './component/ReportResults'
import SelectLabelLanguage from './component/SelectLabelLanguage'
import StatusBar from './component/StatusBar'
import { Labels, Word } from './types'

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

  const languages = ['English', 'українська', 'عربي', '❖']
  const labels: Labels = {
    doKnow: ['I know this', 'я знаю, що це', 'انا اعرف هذا', '✔'],
    doNotKnow: ['Don\'t know', 'не знаю', 'لا أعرف', '✕'],
    doAgain: ['Again', 'Знову', 'تكرارا', '♻'],
    words: ['words', 'слова', 'كلمات', '👄'],
    howToCheck: ['Click the black box to see the word.',
      'Клацніть чорне поле, щоб побачити слово.',
      'انقر فوق المربع الأسود لرؤية الكلمة.', ''],
    howToProceed: ['Click green if you know this word, red if not.',
      'Натисніть зелений, якщо ви знаєте це слово, червоний, якщо ні.',
      'انقر فوق الأخضر إذا كنت تعرف هذه الكلمة ، وإذا لم تكن تعرفها باللون الأحمر.', ''],
    titleEditing: ['Edit the wordlist', 'Відредагуйте список слів', 'قم بتحرير قائمة الكلمات', '👄👄 → 👄👄'],
    doneEditing: ['Done', 'Готово', 'فعله', '✅ ❌'],
    doneEditingAndCleanup: ['Remove ✔', 'Видалити ✔', 'قم بإزالة ✔', '✂ ✅'],
  }


  const startwords: Word[] = [
    { word: 'Norsk', meaning: 'Norwegian', isKnown: false },
    { word: 'Hva heter du?', meaning: 'What is your name?', isKnown: false },
    { word: 'Jeg heter ...', meaning: 'My name is ...', isKnown: false },

  ]
  /*
    ['Unnskyld meg', 'Excuse me', 'Вибачте', 'عفوا'],
    ['Hva', 'what', 'що', 'ماذا او ما'],
    ['Hvor', 'where', 'де', 'أين'],
    ['Hvorfor', 'why', 'чому', 'لماذا'],
    ['Hvordan', 'how', 'як', 'كيف'],
    ['Når', 'when', 'коли', 'متى'],
    ['Mitt navn er', 'my name is', 'мене звати', 'اسمي هو'],
    ['Hva heter du', 'what is your name', 'як тебе звати', 'ما اسمك'],
    ['Alder', 'age', 'вік', 'عمر'],
    ['Gammel', 'old', 'старий', 'عمر او قديم'],
    ['Jobb', 'job', 'робота', 'مهنة'],
    ['Utdanning', 'education', 'освіти', 'التعليم'],
    ['Familie', 'family', 'родина', 'أسرة'],
    ['Barn', 'children', 'дітей', 'الأطفال'],
    ['Sønn', 'son', 'син', 'ابن'],
    ['Datter', 'daughter', 'дочка', 'بنت'],
    ['Hus', 'House', 'Будинок', 'منزل'],
    ['Bok', 'Book', 'книга', 'كتاب'],
    ['Bil', 'Car', 'автомобіль', 'سيارات'],
    ['Katt', 'Cat', 'кішка', 'قط'],
    ['Hund', 'Dog', 'Пес', 'لكن'],
    ['Glede', 'Joy', 'Радість', 'مرح'],
    ['Sol', 'Sun', 'сонце', 'شمس'],
    ['Søster', 'Sister', 'сестра', 'أخت'],
    ['Bror', 'Brother', 'Брат', 'أخ'],
    ['Venn', 'Friend', 'Друг', 'صديق'],
    ['Fjell', 'Mountain', 'Гора', 'جبل'],
    ['Hav', 'Sea', 'море', 'بحر'],
    ['skog', 'Forest', 'Ліс', 'غابة'],
    ['Skjorte', 'Shirt', 'Сорочка', 'قميص'],
    ['Genser', 'Sweater', 'светр', 'سترة'],
    ['Kjole', 'Dress', 'Плаття', 'بدلة'],
    ['Jakke', 'Jacket', 'Піджак', 'السترة'],
    ['Sko', 'Shoes', 'Взуття', 'أحذية'],
    ['Støvler', 'Boots', 'Чоботи', 'أحذية'],
    ['Skjerf', 'Scarf', 'Шарф', 'الأوشحة'],
    ['Belte', 'Belt', 'Пояс', 'حزام'],
    ['Sokker', 'Socks', 'Шкарпетки', 'جوارب'],
    ['Regnjakke', 'Raincoat', 'Дощовик', 'معطف واق من المطر'],
    ['Koffert', 'Suitcase', 'Валіза', 'حقيبة سفر'],
    ['Øredobber', 'Earrings', 'Сережки', 'أقراط'],
    ['Stol', 'Chair', 'Стілець', 'كرسي'],
    ['Seng', 'Bed', 'Ліжко', 'يصلي'],
    ['Bord', 'Table', 'Таблиця', 'الطاولة'],
    ['Skrivebord', 'desk', 'Письмовий стіл', 'طاولة مكتب'],
    ['Hyller', 'Shelves', 'Полиці', 'أرفف'],
    ['Benk', 'Bench', 'Лава', 'مقعد'],
    ['Bokhylle', 'Bookshelf', 'Книжкова полиця', 'رف الكتب'],
  ]
*/

  function isAtTheStart() {
    return count === 0
  }

  function isAtTheEnd() {
    return count > 0 && count < words.length
  }

  function nextWord() {
    setCheck(false)
    if (count === words.length - 1) {
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
    const result = { known, unknown, score, words: words.length };
    localStorage.setItem("flip", JSON.stringify({ words, result }))
  }

  useEffect(() => {
    const saved = localStorage.getItem("flip");
    if (!saved) {
      setWords(startwords)
    } else {
      const parsed = JSON.parse(saved)
      setWords(parsed.words)
    }

  }, [])

  function openEdit() {
    const moreWords = [...words, { word: '', meaning: '', isKnown: false }, { word: '', meaning: '', isKnown: false }, { word: '', meaning: '', isKnown: false }, { word: '', meaning: '', isKnown: false }, { word: '', meaning: '', isKnown: false }]
    setWords(moreWords)
    setEdit(true)
  }

  function closeEdit(doCleanup: boolean) {

    const filtered = words.filter(word => !(word.word === '' || word.meaning === ''))
    const knownWords = filtered.filter(word => word.isKnown);
    const unknownWords = filtered.filter(word => !word.isKnown);

    console.log('filtered', filtered.length);

    console.log('knownWords', knownWords.length);
    console.log('unknownWords', unknownWords.length);
    console.log('startwords', knownWords.length === filtered.length);


    let newWordlist = []

    if (doCleanup) {
      if (knownWords.length === filtered.length) {
        newWordlist = startwords
      } else {
        newWordlist = [...unknownWords]
      }
    } else {
      newWordlist = [...unknownWords, ...knownWords]
    }

    setWords(newWordlist)
    const known = newWordlist.filter(word => word.isKnown).length;
    const unknown = newWordlist.filter(word => !word.isKnown).length;
    const score = Math.round(known / (newWordlist.length) * 100);
    const result = { known, unknown, score, words: newWordlist.length };
    localStorage.setItem("flip", JSON.stringify({ words: newWordlist, result }))
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
        <div className='edit-wordlist'>
          <h2>{labels.titleEditing.at(language - 1)}</h2>

          {words.map((line, index) => {
            return (
              <div key={index} className='edit-definition'>

                <div className='edit-word'>
                  <div className='edit-nr'>
                    {index + 1}.
                  </div>
                  <input type="text"
                    value={line.word}
                    onChange={(e) => handleWordChange(e, index)}
                  />
                </div>
                <div className='edit-meaning'>
                  <div className='edit-known'>
                    {line.isKnown ? '✅' : '❌'}
                  </div>
                  <input type="text"
                    value={line.meaning}
                    onChange={(e) => handleMeaningChange(e, index)}
                  />
                </div>
              </div>
            )
          })
          }

          <div className="button-row">
            <button className='button'
              onClick={() => closeEdit(false)}
            >{labels.doneEditing.at(language - 1)}</button>
            <button className='button'
              onClick={() => closeEdit(true)}
            >{labels.doneEditingAndCleanup.at(language - 1)}</button>
          </div>
        </div>
      }

      {!edit &&
        <div>
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
          <details>
            <summary>This is just a prototype</summary>
            <div className='about-box'>
              Version 0.2 - 13.01.2023<br />
              Please suggest features to <a href="mailto:fredpallesen@gmail.com">Fred</a><br />
              or add an issue to the <a href="https://github.com/xparagon/flip2learn/issues">GitHub repo</a>.
            </div>
          </details>
        </div>
      }
    </div >

  )
}

export default App
