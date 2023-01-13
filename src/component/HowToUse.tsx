import React from 'react';
import { Labels } from '../types';

interface HowToUseProps {
    language: number,
    labels: Labels,
}
function HowToUse({ language, labels }: HowToUseProps) {

    return (
        <div className='how-to-use'>
            <p>
                {labels.howToCheck.at(language - 1)}
            </p>
            <p>
                {labels.howToProceed.at(language - 1)}
            </p>
        </div>
    );
}
export default HowToUse;