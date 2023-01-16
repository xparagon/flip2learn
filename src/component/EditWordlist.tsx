import React, { useRef, useState } from 'react';
import { Labels, Word } from '../types';


interface EditWordlistProps {
    language: number,
    labels: Labels,
    words: Word[],
    setWords: (words: Word[]) => void,
    closeEdit: () => void,
    handleWordChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void,
    handleMeaningChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void,
}
function EditWordlist({ language, labels, words, setWords, closeEdit, handleMeaningChange, handleWordChange }: EditWordlistProps) {

    const [message, setMessage] = useState('Export does not work yet - on mobile');
    const newWords: Word[] = [] // copy of words
    const inputEl = useRef(null);

    function loadFile() {
        // @ts-ignore
        inputEl.current.click();
    }

    const handleFileRead = (e: any) => {
        const content = e.target.result;


        let emptyLineCount = 0;
        let wordlistStart = false;
        let wordlistEnd = false;
        let word = '';
        let meaning = '';

        content.split('\n').forEach((line: string, index: number) => {
            if (line === '') {
                emptyLineCount++;
                if (emptyLineCount === 2) {
                    if (!wordlistStart) {
                        wordlistStart = true;
                    } else {
                        wordlistEnd = true;
                    }
                }
                word = '';
                meaning = '';
            } else {
                emptyLineCount = 0;
                if (wordlistStart && !wordlistEnd) {
                    if (word === '') {
                        word = line;
                    }
                    else if (meaning === '') {
                        meaning = line;
                        newWords.push({ word, meaning, isKnown: false })
                    }
                }
            }
        })
        if (newWords.length > 0) {
            setWords(newWords)
            setMessage(labels.msgLoaded.at(language - 1) as string)
        } else {
            setMessage(labels.msgNoneLoaded.at(language - 1) as string)
        }
    };


    const handleFileChosen = (e: any) => {
        if (e.target.files.length === 0) {
            return;
        }
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = handleFileRead;
        reader.readAsText(file);
    };

    function handleCleanup() {
        // remove known and empty words
        const filtered = words.filter(word => !(word.word === '' || word.meaning === ''))
        const knownWords = filtered.filter(word => word.isKnown);
        const unknownWords = filtered.filter(word => !word.isKnown);
        let newWordlist = []
        if (knownWords.length === filtered.length) {
            newWordlist = [{ word: '', meaning: '', isKnown: false }]
        } else {
            newWordlist = [...unknownWords]
        }
        setWords(newWordlist)
    }

    function handleAddMoreWords() {
        const newWords = [...words]
        for (let i = 0; i < 5; i++) {
            newWords.push({ word: '', meaning: '', isKnown: false })
        }
        setWords(newWords)
    }

    async function saveFile() {

        const newHandle = await window.showSaveFilePicker({
            suggestedName: 'Flip  - ' + ((new Date()).toDateString()) + '.txt',
        });

        const writableStream = await newHandle.createWritable();

        // heading ending with two newlines
        await writableStream.write('Flip  \n'
            + ((new Date()).toDateString())
            + '\n' + words.length + ' words\n\n\n');


        let exportedWords = ''
        words.forEach(line => {
            if (!(line.word === '' || line.meaning === '')) {
                exportedWords += line.word + '\n' + line.meaning + '\n\n'
            }
        })
        await writableStream.write(exportedWords);

        // footer - starting with two newlines
        await writableStream.write('\n\nhttps://flip.fred.technology/\n');
        await writableStream.write('\n\nhttps://sprakverksted.no/\n');

        await writableStream.close();
        setMessage(labels.msgSaved.at(language - 1) as string)
    }


    return (
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
                    onClick={() => closeEdit()}
                >{labels.doneEditing.at(language - 1)}</button>

            </div>


            <div className='select-label-language'>
                <button className="language-button"
                    onClick={() => handleCleanup()}
                >{labels.doCleanup.at(language - 1)}</button>
                <button className="language-button"
                    onClick={() => handleAddMoreWords()}
                >{labels.doAdd.at(language - 1)}</button>
                <button className="language-button"
                    onClick={() => saveFile()}
                >{labels.doExport.at(language - 1)}</button>
                <button className="language-button"
                    onClick={() => loadFile()}
                >{labels.doImport.at(language - 1)}</button>
            </div>

            <div className='hidden-file-input'>
                <input
                    ref={inputEl}
                    type="file"
                    onChange={e => handleFileChosen(e)} />
            </div>
            <hr />
            <pre>{message}</pre>
            <div>
                <a href="https://drive.google.com/drive/folders/1wmoP__LmyQBw0m8bkfWY1MPlxXVDUaZ5?usp=sharing" >Download Flips</a>
            </div>
        </div >
    );
}
export default EditWordlist;