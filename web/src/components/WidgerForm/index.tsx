import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";

import bugImageUrl  from '../../assets/bug.svg';
import ideiaImageUrl  from '../../assets/idea.svg';
import thoughtImageUrl  from '../../assets/thought.svg';
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedBackTypes = {
    BUG : {
        title: 'Problema',
        img: {
            source : bugImageUrl ,
            alt: ' Imagem de  um inseto'
        }
    },
    IDEA : {
        title: 'Ideia',
        img: {
            source : ideiaImageUrl ,
            alt: ' Imagem de uma lâmpada'
        }
    },
    Thought : {
        title: 'Outro',
        img: {
            source : thoughtImageUrl ,
            alt: ' Imagem de um botão de pensamento'
        }
    }

}

export type FeedBackType =  keyof typeof feedBackTypes;

export function WidGetForm(){
    const [feedBackType, setFeedBackType] =  useState<FeedBackType | null >(null);
    const [feedbackSend, setFeedbackSend] =  useState(false);


    function handleRestartFeedback(){
        setFeedbackSend(false)
        setFeedBackType(null);
    }

    return(
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">


            {feedbackSend ?  (
                <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback}/>
            ): (
                <>
                    {!feedBackType ? (
                        <FeedbackTypeStep onFeedbackTypeChanged={setFeedBackType}  />
                    ) : (
                    <FeedbackContentStep  
                            feedBackType={feedBackType}
                            onFeedbackRestartRequested={handleRestartFeedback}
                            onFeedbackSend = {() => setFeedbackSend(true)}
                        />
                    )}      
                </>
            )}

            <footer className="text-xs text-neutral-400">
                Feito com ♥ pela <a className="underline underline-offset-2 "href="/"> Rocketseat </a>
            </footer>
        </div>
    )
}