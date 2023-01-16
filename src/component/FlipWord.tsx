import React from 'react';
import { Labels, Word } from '../types';

interface FlipWordProps {
    check: boolean,
    count: number,
    handleCheck: () => void,
    handleNo: () => void,
    handleYes: () => void,
    language: number,
    words: Word[],
    labels: Labels,
}
function FlipWord({ check, count,
    handleCheck, handleNo, handleYes, language, words, labels }: FlipWordProps) {

    return (
        <div className='flip-word'>
            <div className="box">
                {words[count].word}
            </div>
            <div className={'box ' + (check ? 'show-word' : 'hide-word')}
                onMouseDown={() => handleCheck()}
            >
                {words[count].meaning}
            </div>
            <div className="button-row">
                <button className='button isNo'
                    onMouseDown={handleCheck}
                    onTouchStart={handleCheck}
                    onMouseUp={handleNo}
                >{labels.doNotKnow.at(language - 1)}</button>
                <button className='button isYes'
                    onMouseDown={handleCheck}
                    onTouchStart={handleCheck}
                    onMouseUp={handleYes}
                >{labels.doKnow.at(language - 1)}</button>
            </div>
        </div>
    );
}
export default FlipWord;