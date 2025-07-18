import * as Yup from "yup";
import AppError from "../../errors/AppError";
import Prompt from "../../models/Prompt";
import ShowPromptService from "./ShowPromptService";

interface PromptData {
    id?: number;
    name: string;
    apiKey: string;
    prompt: string;
    prompt1?: string;
    prompt2?: string;
    prompt3?: string;
    activePrompt?: number;
    rotatePrompts?: boolean;
    maxTokens?: number;
    temperature?: number;
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
    queueId?: number;
    maxMessages?: number;
    companyId: string | number;
    voice?: string;
    voiceKey?: string;
    voiceRegion?: string;
    finishTicket?: number;
}

interface Request {
    promptData: PromptData;
    promptId: string | number;
    companyId: string | number;
}

const UpdatePromptService = async ({
    promptId,
    promptData,
    companyId
}: Request): Promise<Prompt | undefined> => {
    const promptTable = await ShowPromptService({ promptId: promptId, companyId });

    const promptSchema = Yup.object().shape({
        name: Yup.string().required("ERR_PROMPT_NAME_INVALID"),
        prompt: Yup.string().required("ERR_PROMPT_PROMPT_INVALID"),
        apiKey: Yup.string().required("ERR_PROMPT_APIKEY_INVALID"),
        queueId: Yup.number().required("ERR_PROMPT_QUEUEID_INVALID"),
        maxMessages: Yup.number().required("ERR_PROMPT_MAX_MESSAGES_INVALID")
    });

    const { name, apiKey, prompt, prompt1, prompt2, prompt3, activePrompt, rotatePrompts, maxTokens, temperature, promptTokens, completionTokens, totalTokens, queueId, maxMessages, voice, voiceKey, voiceRegion, finishTicket } = promptData;

    try {
        await promptSchema.validate({ name, apiKey, prompt, maxTokens, temperature, promptTokens, completionTokens, totalTokens, queueId, maxMessages });
    } catch (err) {
        throw new AppError(`${JSON.stringify(err, undefined, 2)}`);
    }

    await promptTable.update({ name, apiKey, prompt, prompt1, prompt2, prompt3, activePrompt, rotatePrompts, maxTokens, temperature, promptTokens, completionTokens, totalTokens, queueId, maxMessages, voice, voiceKey, voiceRegion, finishTicket });
    await promptTable.reload();
    return promptTable;
};

export default UpdatePromptService;
