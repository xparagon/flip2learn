
export interface Labels {
    doKnow: string[],
    doNotKnow: string[],
    doAgain: string[],
    words: string[],
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
}

export interface Word {
    word: string,
    meaning: string,
    isKnown: boolean,
}

