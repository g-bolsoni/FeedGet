/*Operações que podem ser feitas no BD */
export interface FeedbacksRepositoryProps {
    type: string,
    comment: string,
    screenshot?:  string,
}
export interface FeedbacksRepository { 
    //  O que minha aplicação pode fazer com os Feedbacks (Criar, Editar, Remover ...)
    create : (data: FeedbacksRepositoryProps) => Promise<void>; 
}