import { env } from 'node:process';

interface TenorJSONBody {
    results: {
        content_description: string;
        media: {
            gif: {
                url: string;
            };
            [key: string]: unknown;
        }[];
        [key: string]: unknown;
    }[];
}

export async function getLunaGif(): Promise<string> {
    const tenorApiKey = env.TENOR_API_KEY;

    const res = await fetch(`https://api.tenor.com/v1/search?q=luna-lovegood&limit=25&key=${tenorApiKey}`);

    if (!res.ok) throw new Error(`Failed to get gifs: ${res.status} ${res.statusText}`);

    const json = (await res.json()) as TenorJSONBody;

    const gifs = json.results
        .filter(result => result.content_description === 'Luna Lovegood GIF')
        .map(result => result.media[0].gif.url);

    return gifs[Math.floor(Math.random() * gifs.length)];
}
