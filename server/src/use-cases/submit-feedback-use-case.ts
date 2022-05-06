import { MailAdapter } from "../adapters/mail.adapter";
import { PrismaFeedbacksRepository } from "../repositories/prisma/prismaFeedbackRepository";

interface SubmitFeedbacksUseCasesProps {
    type: string,
    comment: string,
    screenshot?:  string,
}
export class SubmitFeedbacksUseCases {
    constructor(
        private feedbacksRepository: PrismaFeedbacksRepository,
        private mailAdapter: MailAdapter,
    ){}
    async execute( request: SubmitFeedbacksUseCasesProps) {
        const {type, comment, screenshot} = request;


        if(!type){
            throw new Error('Type is not defined')
        }

        if(!comment){
            throw new Error('Comment is not defined')
        }


        if(screenshot && !screenshot.startsWith("data:image/png;base64")) {
            throw new Error('Invalid screenshot format')
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        });

        await this.mailAdapter.sendMail({
            subject:'Novo Feedback',
            body: [
                `<div style="font-family: sans-serif; font-size:16px; color: #222;">`,
                `<p>Tipo do Feedback: ${type} </p>`,
                `<p>Comentário: ${comment} </p>`,
                screenshot ?  `<img src="${screenshot}" />` :  '',
                `</div>`
            ].join('\n')
        })
    }
}