/*Posso implementar as funções do BD */
import { Prisma } from "../../prisma";
import { FeedbacksRepository, FeedbacksRepositoryProps } from "../FeedbacksRepository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
    async create({type, comment, screenshot }: FeedbacksRepositoryProps){
        await Prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot,
            }
        });    
    }
}