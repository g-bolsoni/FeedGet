import { FormEvent, useState } from "react";
import { ScreenshotButton } from "../ScreenshotButton";
import { ArrowLeft } from "phosphor-react";
import { FeedBackType, feedBackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { api } from "../../../lib/api";
import { Loading } from "../../Loading";

interface  FeedbackContentStepProps {
    feedBackType: FeedBackType,
    onFeedbackRestartRequested : () => void,
    onFeedbackSend: () => void
}
export function FeedbackContentStep({ 
    feedBackType,
    onFeedbackRestartRequested,
    onFeedbackSend
}: FeedbackContentStepProps) {
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState('');
    const feedbackTypeInfo = feedBackTypes[feedBackType];
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);

    async function handleSubmitFeedback(e: FormEvent  ){
        setIsSendingFeedback(true)
        e.preventDefault();
        console.log({feedBackType,comment,screenshot});
        await api.post('feedbacks', {
            type: feedBackType,
            comment,
            screenshot,
        });
        onFeedbackSend();
        setIsSendingFeedback(false);
    }
    return (
        <>
            <header>
                <button
                    onClick={onFeedbackRestartRequested}
                    type="button"
                    className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100" >
                    <ArrowLeft weight="bold" className="w-4 h-4"  />
                </button>
                <CloseButton   />
                <span className="text-xl leading-6 flex items-center gap-2">
                    <img src={feedbackTypeInfo.img.source} alt={feedbackTypeInfo.img.alt} className="w-6  h-6" />
                    {feedbackTypeInfo.title}
                </span>
            </header>
            <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
                <textarea
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100  border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder='Conte com detalhes o que está acontecendo...'
                    onChange={(e) => setComment(e.target.value)}
                />

                <footer className="  flex gap-2 mt-2 ">
                   <ScreenshotButton
                        screenshot = {screenshot}
                        onScreenshotTook={setScreenshot}
                   />
                    <button
                        disabled={comment.length === 0 || isSendingFeedback}
                        type="submit"
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                    >
                        { isSendingFeedback ? <Loading /> : 'Enviar Feedback' }
                    </button>
                </footer>
            </form>
        </>
    );
}