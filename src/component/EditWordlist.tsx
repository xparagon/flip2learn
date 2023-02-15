import React, { useEffect, useRef, useState } from "react";
import { Labels, Word } from "../types";


interface EditWordlistProps {
    language: number;
    labels: Labels;
    words: Word[];
    setWords: (words: Word[]) => void;
    closeEdit: () => void;
    handleWordChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => void;
    handleMeaningChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => void;
}
function EditWordlist({
    language,
    labels,
    words,
    setWords,
    closeEdit,
    handleMeaningChange,
    handleWordChange,
}: EditWordlistProps) {
    const [message, setMessage] = useState("");
    const inputEl = useRef(null);
    const [text, setText] = useState("");
    const [showText, setShowText] = useState(false);

    function loadFile() {
        // @ts-ignore
        inputEl.current.click();
    }
    function loadCSVFile() {
        fetch("./flip.csv")
            .then(res => { return res.text() })
            .then(text => {
                fillWordsFromContent(text);
            }
            );
    }

    const handleFileRead = (e: any) => {
        const content = e.target.result;
        fillWordsFromContent(content);
    }

    function fillWordsFromContent(content: string) {
        const newWords = [...words];
        // count number of lines with a comma
        let commaCount = 0;
        let numberOfLines = 0;
        content.split("\n").forEach((line: string, index: number) => {
            numberOfLines++;
            if (line.includes(",")) {
                commaCount++;
            }
        });
        if (commaCount > 0) {
            fromCommaFormat(content, newWords);
        } else {
            fromFlipFormat(content, newWords);
        }
        if (newWords.length > 0) {
            setWords(newWords);
            setMessage(labels.msgLoaded.at(language - 1) as string);
        } else {
            setMessage(labels.msgNoneLoaded.at(language - 1) as string);
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

    function fromCommaFormat(content: string, newWords: Word[]) {
        content.split("\n").forEach((line: string, index: number) => {
            if (line.includes(",")) {
                const word = line.split(",")[0].trim();
                const meaning = line.split(",")[1].trim();
                newWords.push({ word, meaning, isKnown: false });
            }
        });
    }

    function fromFlipFormat(content: string, newWords: Word[]) {
        let emptyLineCount = 0;
        let wordlistStart = false;
        let wordlistEnd = false;
        let word = "";
        let meaning = "";

        content.split("\n").forEach((line: string, index: number) => {
            if (line === "") {
                emptyLineCount++;
                if (emptyLineCount === 2) {
                    if (!wordlistStart) {
                        wordlistStart = true;
                    } else {
                        wordlistEnd = true;
                    }
                }
                word = "";
                meaning = "";
            } else {
                emptyLineCount = 0;
                if (wordlistStart && !wordlistEnd) {
                    if (word === "") {
                        word = line.trim();
                    } else if (meaning === "") {
                        meaning = line.trim();
                        newWords.push({ word, meaning, isKnown: false });
                    }
                }
            }
        });
    }

    function handleNuke() {
        const newWords: Word[] = [];
        newWords.unshift({ word: "", meaning: "", isKnown: false });
        setWords(newWords);
    }

    function handleCleanup() {
        // remove known and empty words
        const filtered = words.filter(
            (word) => !(word.word === "" || word.meaning === "")
        );
        const knownWords = filtered.filter((word) => word.isKnown);
        const unknownWords = filtered.filter((word) => !word.isKnown);
        let newWordlist = [];
        if (knownWords.length === filtered.length) {
            newWordlist = [{ word: "", meaning: "", isKnown: false }];
        } else {
            newWordlist = [...unknownWords];
        }
        setWords(newWordlist);
    }

    function handleAddMoreWords() {
        const newWords = [...words];
        for (let i = 0; i < 5; i++) {
            newWords.unshift({ word: "", meaning: "", isKnown: false });
        }
        setWords(newWords);
    }

    async function saveFile() {
        const fileHeader =
            "Flip  \n" +
            new Date().toDateString() +
            "\n" +
            words.length +
            " words\n\n\n";
        let exportedWords = "";
        words.forEach((line) => {
            if (!(line.word === "" || line.meaning === "")) {
                exportedWords += line.word + ", " + line.meaning + "\n";
            }
        });
        const fileContent =
            fileHeader +
            exportedWords +
            "\nhttps://flip.fred.technology/" +
            "\nhttps://sprakverksted.no/\n";
        const blob = new Blob([fileContent], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        const now = new Date();
        const dateTime =
            now.getFullYear() + "-"
            + ((now.getMonth() + 1) < 10 ? '0' : '') + (now.getMonth() + 1) + "-"
            + now.getDate() + ' '
            + now.getHours() + '.'
            + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
        a.download = "Flip " + dateTime + " words.csv";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
        setMessage(labels.msgSaved.at(language - 1) as string);
    }

    function shuffleArray(list: Word[]) {
        for (let i = list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }
        return list;
    }

    function handleShuffle() {
        const newWords = [...words];
        const shuffled = shuffleArray(newWords);
        setWords(shuffled);
        setMessage(labels.msgShuffled.at(language - 1) as string);
    }

    function handleSwap() {
        const newWords = [...words];
        const swapped = newWords.map((word) => {
            return { word: word.meaning, meaning: word.word, isKnown: word.isKnown };
        });
        setWords(swapped);
        setMessage(labels.msgSwapped.at(language - 1) as string);
    }

    function handleOpenText() {
        setText('');
        setShowText(true);
    }

    function handleCloseAndUseTest() {
        setShowText(false);
        console.log(text);
        fillWordsFromContent(text);

    }


    return (
        <div className="edit-wordlist">

            <div className="button-row">
                <h2>{labels.titleEditing.at(language - 1)} {words.length} {labels.words.at(language - 1)}</h2>
                <button className="small-button" onClick={() => closeEdit()}>
                    {labels.doneEditing.at(language - 1)}
                </button>
            </div>
            <div className="button-row">
                <button className="small-button" onClick={() => handleSwap()}>
                    {labels.doSwap.at(language - 1)}
                </button>
                <button className="small-button" onClick={() => handleShuffle()}>
                    {labels.doShuffle.at(language - 1)}
                </button>
                <button className="small-button focus-button" onClick={() => handleAddMoreWords()}>
                    {labels.doAdd.at(language - 1)}
                </button>
                <button className="small-button" onClick={() => handleCleanup()}>
                    {labels.doCleanup.at(language - 1)}
                </button>
                <button className="small-button" onClick={() => handleNuke()}>
                    🔥
                </button>
            </div>

            {words.map((line, index) => {
                return (
                    <div key={index} className="edit-definition">
                        <div className="edit-word">
                            <input className="edit-word-input"
                                type="text"
                                value={line.word}
                                onChange={(e) => handleWordChange(e, index)}
                            />
                            <div className="edit-known">&nbsp;{line.isKnown ? "✅" : ""}</div>
                        </div>
                        <div className="edit-meaning">
                            <input className="edit-meaning-input"
                                type="text"
                                value={line.meaning}
                                onChange={(e) => handleMeaningChange(e, index)}
                            />
                        </div>
                    </div>
                );
            })}

            <div className="button-row">
                <button className="button" onClick={() => closeEdit()}>
                    {labels.doneEditing.at(language - 1)}
                </button>
            </div>

            <hr />
            <div className="button-row">

                {!showText && (

                    <button className="small-button focus-button" onClick={() => handleOpenText()}>
                        ☷ flip ☷
                    </button>

                )}
                {showText &&
                    <div>
                        <button className="small-button focus-button" onClick={() => handleCloseAndUseTest()}>
                            ✚
                        </button>
                        <button className="small-button" onClick={() => setShowText(false)}>
                            ✕
                        </button>
                    </div>
                }

                <button className="small-button" onClick={() => saveFile()}>
                    {labels.doExport.at(language - 1)}
                </button>

                <button className="small-button" onClick={() => loadFile()}>
                    {labels.doImport.at(language - 1)}
                </button>

                <button className="small-button" onClick={() => loadCSVFile()}>
                    +280   {labels.words.at(language - 1)}
                </button>
            </div>

            <div className="hidden-file-input">
                <input
                    ref={inputEl}
                    type="file"
                    onChange={(e) => handleFileChosen(e)}
                />
            </div>
            <hr />
            <pre>{message}</pre>



            {showText && (
                <>
                    <div className="text-area-wrapper">

                        <textarea
                            className="text-area"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>


                </>

            )}
            <br />
            <div className="download-links">
                <p>
                    <a href="https://fred.technology/flips">
                        {labels.moreWords.at(language - 1)}
                    </a>
                </p>
            </div>
            <br />
            <br />
        </div>
    );
}
export default EditWordlist;
