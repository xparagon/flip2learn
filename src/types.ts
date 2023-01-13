
export interface Labels {
    doKnow: string[],
    doNotKnow: string[],
    doAgain: string[],
    words: string[],
    howToCheck: string[],
    howToProceed: string[],
    titleEditing: string[],
    doneEditing: string[],
    doneEditingAndCleanup: string[],
}

export interface Word {
    word: string,
    meaning: string,
    isKnown: boolean,
}

