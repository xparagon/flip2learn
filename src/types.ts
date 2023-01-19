
export interface Labels {
    doKnow: string[],
    doNotKnow: string[],
    doAgain: string[],
    doShuffle: string[],
    doSwap: string[],
    words: string[],
    moreWords: string[],
    howToCheck: string[],
    howToProceed: string[],
    titleEditing: string[],
    doneEditing: string[],
    doCleanup: string[],
    doAdd: string[],
    doExport: string[],
    doImport: string[],
    msgSaved: string[],
    msgLoaded: string[],
    msgNoneLoaded: string[],
    msgShuffled: string[],
    msgSwapped: string[],
    msgSample: string[],
    help: string[],
}

export interface Word {
    word: string,
    meaning: string,
    isKnown: boolean,
}

export interface Result {
    known: number,
    unknown: number,
    score: number,
    words: number,
}


