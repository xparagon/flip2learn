import React from 'react';
import { Labels } from '../types';

interface ComponentProps {
    countNo: number,
    countYes: number,
    totalWords: number,
    language: number,
    labels: Labels,
    doAgain: () => void,
}
function ReportResults({ countNo, countYes, totalWords, language, labels, doAgain }: ComponentProps) {

    return (
        <div className='report-results'>
            <div className='result'>
                <div className="box isYes">
                    {countYes} {labels.words.at(language - 1)} ({Math.trunc(countYes / totalWords * 100)}%)
                </div>

                <div className="box isNo">
                    {countNo} {labels.words.at(language - 1)} ({Math.trunc(countNo / totalWords * 100)}%)
                </div>
            </div>

            <div className="button-row">
                <button className='button'
                    onClick={doAgain}
                >{labels.doAgain.at(language - 1)}</button>
            </div>
        </div>
    );
}
export default ReportResults;