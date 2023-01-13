import { useState } from 'react'
import './App.css'
import CountUp from './component/CountUp'
import FlipWord from './component/FlipWord'
import HowToUse from './component/HowToUse'
import ReportResults from './component/ReportResults'
import SelectLabelLanguage from './component/SelectLabelLanguage'
import StatusBar from './component/StatusBar'
import { Labels } from './types'

function App() {
  const [done, setDone] = useState(false)
  const [check, setCheck] = useState(false)
  const [countNo, setCountNo] = useState(0)
  const [countYes, setCountYes] = useState(0)
  const [count, setCount] = useState(0)
  const [language, setLanguage] = useState(1)

  const languages = ['English', 'українська', 'عربي']
  const labels: Labels = {
    doKnow: ['I know this', 'я знаю, що це', 'انا اعرف هذا'],
    doNotKnow: ['Don\'t know', 'не знаю', 'لا أعرف'],
    doAgain: ['Again', 'Знову', 'تكرارا'],
    words: ['words', 'слова', 'كلمات'],
    howToCheck: ['Click the black box to see the word.',
      'Клацніть чорне поле, щоб побачити слово.',
      'انقر فوق المربع الأسود لرؤية الكلمة.'],
    howToProceed: ['Click green if you know this word, red if not.',
      'Натисніть зелений, якщо ви знаєте це слово, червоний, якщо ні.',
      'انقر فوق الأخضر إذا كنت تعرف هذه الكلمة ، وإذا لم تكن تعرفها باللون الأحمر.'],
  }



  const words = [
    ['Norsk', 'Norwegian', 'норвезька', 'النرويجية'],
    ['Vær så snill', 'Please', 'Будь ласка', 'لو سمحت'],
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


  function atTheStart() {
    return count === 0
  }

  function atTheEnd() {
    return count > 0 && count < words.length
  }


  function nextWord() {
    setCheck(false)
    if (count === words.length - 1) {
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
    setCountNo(countNo + 1)
    nextWord()
  }

  function handleYes() {
    setCountYes(countYes + 1)
    nextWord()
  }

  function handleCheck() {
    setCheck(true)
  }

  return (
    <div className="App">

      <img src="/logo.png" className="logo" alt="Språkverksted logo" />

      <SelectLabelLanguage
        languages={languages}
        language={language}
        setLanguage={setLanguage}
      />

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

        {atTheStart() &&
          <HowToUse
            language={language}
            labels={labels}
          />
        }

        {atTheEnd() &&
          <StatusBar
            countNo={countNo}
            countYes={countYes}
            totalWords={words.length}
          />
        }
      </footer >
      <hr />
      <details>
        <summary>This is just a prototype</summary>
        <div className='about-box'>
          Version 0.2 - 13.01.2023<br />
          Please suggest features to <a href="mailto:fredpallesen@gmail.com">Fred</a><br />
          or add an issue to the <a href="https://github.com/xparagon/flip2learn/issues">GitHub repo</a>.
        </div>
      </details>
    </div >
  )
}

export default App
