import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [done, setDone] = useState(false)
  const [check, setCheck] = useState(false)
  const [countNo, setCountNo] = useState(0)
  const [countYes, setCountYes] = useState(0)
  const [count, setCount] = useState(0)
  const [language, setLanguage] = useState(1)

  const labels = {
    doKnow: ['I know this', 'я знаю, що це', 'انا اعرف هذا'],
    doNotKnow: ['Don\'t know', 'не знаю', 'لا أعرف'],
    doAgain: ['Again', 'Знову', 'تكرارا'],
    words: ['words', 'слова', 'كلمات'],
    black: ['Click the black box to see the word.',
      'Клацніть чорне поле, щоб побачити слово.',
      'انقر فوق المربع الأسود لرؤية الكلمة.'],
    greenOrRed: ['Click green if you know this word, red if not.',
      'Натисніть зелений, якщо ви знаєте це слово, червоний, якщо ні.',
      'انقر فوق الأخضر إذا كنت تعرف هذه الكلمة ، وإذا لم تكن تعرفها باللون الأحمر.'],
  }



  const words = [
    ['norsk', 'Norwegian', 'норвезька', 'النرويجية'],
    ['Hallo', 'Hello', 'Привіт', 'مرحبًا'],
    ['Takk skal du ha', 'Thank you', 'Дякую', 'شكرًا لك'],
    ['God dag', 'Good day', 'Хороший день', 'صباح الخير'],
    ['God morgen', 'Good morning', 'Доброго ранку', 'صباح الخير'],
    ['God kveld', 'Good evening', 'Добрий вечір', 'مساء الخير'],
    ['God natt', 'Good night', 'Надобраніч', 'طاب مساؤك'],
    ['Ha en fin helg', 'Have a nice weekend', 'Гарних вихідних', 'أتمنى لك عطلة نهاية أسبوع سعيدة'],
    ['God jul', 'Merry Christmas', 'щасливого Різдва', 'عيد ميلاد مجيد'],
    ['Godt nytt år', 'Happy New Year', 'Щасливого Нового року', 'سنة جديدة سعيدة'],
    ['God påske', 'Happy Easter', 'Щасливого Великодня', 'عيد فصح سعيد'],
    ['Ha det', 'Goodbye', 'до побачення', 'مع السلامة'],
    ['Vær så snill', 'Please', 'Будь ласка', 'لو سمحت'],
    ['Unnskyld meg', 'Excuse me', 'Вибачте', 'عفوا'],
    ['Ja', 'Yes', 'Так', 'نعم'],
    ['Nei', 'No', 'Немає', 'رقم'],
    ['Ikke', 'Not', 'ні', 'ملحوظة'],
    ['Og', 'And', 'І', 'بطة'],
    ['Eller', 'Or', 'Або', 'أو'],
    ['Jeg', 'I', 'я', 'في'],
    ['du', 'you', 'ви', 'أنت'],
    ['han', 'he', 'він', 'هاه'],
    ['hun', 'she', 'вона', 'هي'],
    ['vi', 'we', 'ми', 'نحن'],
    ['de', 'they', 'Вони', 'أنهم'],
    ['hva', 'what', 'що', 'ماذا او ما'],
    ['hvor', 'where', 'де', 'أين'],
    ['Hvorfor', 'why', 'чому', 'لماذا'],
    ['hvordan', 'how', 'як', 'كيف'],
    ['når', 'when', 'коли', 'متى'],
    ['hvilken', 'which', 'котрий', 'التي'],
    ['hvilken', 'which', 'котрий', 'التي'],
    ['mitt navn er', 'my name is', 'мене звати', 'اسمي هو'],
    ['hva heter du', 'what is your name', 'як тебе звати', 'ما اسمك'],
    ['jeg er', 'I am', 'Мені', 'في الصباح'],
    ['alder', 'age', 'вік', 'عمر'],
    ['gammel', 'old', 'старий', 'عمر او قديم'],
    ['jobb', 'job', 'робота', 'مهنة'],
    ['utdanning', 'education', 'освіти', 'التعليم'],
    ['familie', 'family', 'родина', 'أسرة'],
    ['barn', 'children', 'дітей', 'الأطفال'],
    ['sønn', 'son', 'син', 'ابن'],
    ['datter', 'daughter', 'дочка', 'بنت'],
    ['Hus', 'House', 'Будинок', 'منزل'],
    ['Bok', 'Book', 'книга', 'كتاب'],
    ['Bil', 'Car', 'автомобіль', 'سيارات'],
    ['Katt', 'Cat', 'кішка', 'قط'],
    ['Hund', 'Dog', 'Пес', 'لكن'],
    ['Glede', 'Joy', 'Радість', 'مرح'],
    ['Kjærlighet', 'Love', 'кохання', 'يعد'],
    ['Sol', 'Sun', 'сонце', 'شمس'],
    ['Søster', 'Sister', 'сестра', 'أخت'],
    ['Bror', 'Brother', 'Брат', 'أخ'],
    ['Far', 'Father', 'батько', 'أب'],
    ['Mor', 'Mother', 'мати', 'الأم'],
    ['Venn', 'Friend', 'Друг', 'صديق'],
    ['fjell', 'Mountain', 'Гора', 'جبل'],
    ['Hav', 'Sea', 'море', 'بحر'],
    ['skog', 'Forest', 'Ліс', 'غابة'],
    ['Grønn', 'Green', 'Зелений', 'لون أخضر'],
    ['Ed', 'Ed', 'Червоний', 'حلف'],
    ['Blå', 'Blue', 'Синій', 'أزرق'],
    ['Hvit', 'White', 'Білий', 'أبيض'],
    ['Svart', 'Black', 'чорний', 'أسود'],
    ['Skjorte', 'Shirt', 'Сорочка', 'قميص'],
    ['Genser', 'Sweater', 'светр', 'سترة'],
    ['Bukser', 'Pants', 'Штани', 'بنطال'],
    ['Kjole', 'Dress', 'Плаття', 'بدلة'],
    ['Jakke', 'Jacket', 'Піджак', 'السترة'],
    ['Sko', 'Shoes', 'Взуття', 'أحذية'],
    ['Støvler', 'Boots', 'Чоботи', 'أحذية'],
    ['Skjerf', 'Scarf', 'Шарф', 'الأوشحة'],
    ['Hatt', 'Hat', 'Капелюх', 'اكرهه'],
    ['Belte', 'Belt', 'Пояс', 'حزام'],
    ['Kappe', 'Cape', 'мис', 'رداء'],
    ['Sjal', 'Shawl', 'шаль', 'شال'],
    ['Lommetørkle', 'Handkerchief', 'носова хустка', 'منديل'],
    ['Sokker', 'Socks', 'Шкарпетки', 'جوارب'],
    ['Slips', 'Necktie', 'краватка', 'ربطة عنق'],
    ['Regnjakke', 'Raincoat', 'Дощовик', 'معطف واق من المطر'],
    ['Solbriller', 'Sunglasses', 'Сонцезахисні окуляри', 'نظارة شمسيه'],
    ['Badekåpe', 'Bathrobe', 'Халат', 'رداء الحمام'],
    ['Ullgenser', 'Wool sweater', 'Вовняний светр', 'كنزة صوف'],
    ['Bag', 'Bag', 'Сумка', 'كيس'],
    ['Koffert', 'Suitcase', 'Валіза', 'حقيبة سفر'],
    ['Armbånd', 'Bracelet', 'Браслет', 'إسورة'],
    ['Ringe', 'Ring', 'Каблучка', 'حلقة'],
    ['Øredobber', 'Earrings', 'Сережки', 'أقراط'],
    ['Mobiltelefon', 'Mobile phone', 'Мобільний телефон', 'هاتف محمول'],
    ['Hvor gammel er du?', 'How old are you?', 'Скільки тобі років?', 'كم عمرك؟'],
    ['Stol', 'Chair', 'Стілець', 'كرسي'],
    ['Seng', 'Bed', 'Ліжко', 'يصلي'],
    ['Bord', 'Table', 'Таблиця', 'الطاولة'],
    ['skrivebord', 'desk', 'Письмовий стіл', 'طاولة مكتب'],
    ['Hyller', 'Shelves', 'Полиці', 'أرفف'],
    ['Benk', 'Bench', 'Лава', 'مقعد'],
    ['Bokhylle', 'Bookshelf', 'Книжкова полиця', 'رف الكتب'],
    ['TV-benk', 'TV stand', 'тумба під телевізор', 'حامل تلفاز'],
    ['Spisebord', 'Dining table', 'Обідній стіл', 'طاولة الطعام'],
    ['Salongbord', 'Coffee table', 'Журнальний столик', 'منضدة قهوة'],
  ]
  const barNo = {
    width: (countNo / words.length) * 100 + '%'
  }
  const barUnknown = {
    width: ((words.length - countNo - countYes) / words.length) * 100 + '%'
  }
  const barYes = {
    width: (countYes / words.length) * 100 + '%'
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

      <p>
        <input type="radio" name="fav_language" value="1"
          checked={language === 1}
          onChange={() => setLanguage(1)} />
        <label>English</label>
        <input type="radio" name="fav_language" value="2"
          checked={language === 2}
          onChange={() => setLanguage(2)} />
        <label >українська</label>
        <input type="radio" name="fav_language" value="3"
          checked={language === 3}
          onChange={() => setLanguage(3)} />
        <label >عربي</label>
      </p>

      <p>
        {count + 1} /&nbsp;
        {words.length}
      </p>
      {!done &&
        <>
          <div className="box">
            {words[count][0]}
          </div>

          <div className={'box ' + (check ? 'show-word' : 'hide-word')}
            onMouseDown={() => handleCheck()}
          >
            {words[count][language]}
          </div>
        </>
      }
      {!done &&
        <div className="button-row">
          <button className='button isNo'
            onMouseDown={() => handleCheck()}
            onMouseUp={() => handleNo()}
          >{labels.doNotKnow.at(language - 1)}</button>
          <button className='button isYes'
            onMouseDown={() => handleCheck()}
            onMouseUp={() => handleYes()}
          >{labels.doKnow.at(language - 1)}</button>
        </div>
      }

      {done &&
        <div className='result'>
          <div className="box isYes">
            {countYes} {labels.words.at(language - 1)} ({Math.trunc(countYes / words.length * 100)}%)
          </div>

          <div className="box isNo">
            {countNo} {labels.words.at(language - 1)} ({Math.trunc(countNo / words.length * 100)}%)
          </div>
        </div>
      }

      {done &&
        <div className="button-row">
          <button className='button'
            onClick={() => resetScore()}
          >{labels.doAgain.at(language - 1)}</button>

        </div>
      }

      <footer>
        {count === 0 &&
          <div>
            <p>
              {labels.black.at(language - 1)}
            </p>
            <p>
              {labels.greenOrRed.at(language - 1)}
            </p>
          </div>
        }

        {(count > 0 && count < words.length) &&
          <div style={{ display: 'flex' }}>
            <div className='bar isNo' style={barNo}></div>
            <div className='bar isUnknown' style={barUnknown}></div>
            <div className='bar isYes' style={barYes}></div>
          </div >
        }
        <br />
        <small>
          This is a prototype. Please suggest features to <a href="mailto:fredpallesen@gmail.com">Fred</a>
        </small>
      </footer >
    </div >
  )
}

export default App
