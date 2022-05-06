import { SubmitFeedbacksUseCases } from "./submit-feedback-use-case";

//spies = espiões 

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const  submitFeedback = new SubmitFeedbacksUseCases(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy}
);
describe('Submit feedback', ()=> {//varios testes para uma funcionalidade

    it('should be able to submit a feedback', async  () => {
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();

        await expect(submitFeedback.execute({
            type : "BUG",
	        comment : "Está tudo quebrado !!!! ",
            screenshot:'data:image/png;base64;eobfgiuEBI',
        })).resolves.not.toThrow();


    });

    it('should not be able to submit feedback without type ', async  () => {
        await expect(submitFeedback.execute({
            type : "",
	        comment : "Está tudo quebrado !!!! ",
            screenshot:'data:image/png;base64;eobfgiuEBI',
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback without comments ', async  () => {
        await expect(submitFeedback.execute({
            type : "BUG",
	        comment : "",
            screenshot:'data:image/png;base64;eobfgiuEBI',
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback with a invalid screenshot ', async  () => {
        await expect(submitFeedback.execute({
            type : "BUG",
	        comment : "Está tudo quebrado !!!! ",
            screenshot:'dataimagepngbase64eobfgiuEBI',
        })).rejects.toThrow();
    });

});