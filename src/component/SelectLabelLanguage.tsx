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
                    <>
                        <input type="radio" value={index + 1}
                            checked={+language === index + 1}
                            onChange={() => setLanguage(index + 1)} />
                        <label>{languages[index]}</label>
                    </>
                )
            })
            }
        </div>
    );
}
export default SelectLabelLanguage;