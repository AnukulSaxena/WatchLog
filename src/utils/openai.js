import OpenAI from 'openai';
import conf from '../conf/conf';

const openai = new OpenAI({
    apiKey: conf.openAiKey,
    dangerouslyAllowBrowser: true
});

export async function getQueryData(query) {
    return await openai.chat.completions.create({
        messages: [{ role: 'user', content: `gimme response as a comma separated string with atleast 20 responses with only name, my query is '${query}' ` }],
        model: 'gpt-3.5-turbo',
    });
}
