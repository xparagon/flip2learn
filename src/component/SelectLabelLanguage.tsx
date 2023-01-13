import React from 'react';

interface SelectLabelLanguageProps {
    languages: string[],
    language: number,
    setLanguage: (language: number) => void,

}

function SelectLabelLanguage({ languages, language, setLanguage }: SelectLabelLanguageProps) {

    return (
        <div className='select-label-language'>
            {languages.map((language, index) => {
                return (
                    <button key={index} className="language-button"
                        onClick={() => setLanguage(index + 1)}

                    >{languages[index]}</button>
                )
            })
            }
        </div>
    );
}
export default SelectLabelLanguage;