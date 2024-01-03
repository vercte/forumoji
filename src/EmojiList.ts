const EmojiList = import("assets/emoji.json");
const UnicodeList = import("assets/unicode-emoji.json");
const HiddenEmoji = import("assets/hidden-emoji.json");

export interface EmojiData {
    name: string;
    codepoint: string;
    category: string;
    subcategory: string;
    keywords: string[];

    author: string[] | undefined;
    contributed: boolean;
}

import broken from "img/broken.svg?inline";
export const brokenImage = broken;

export function getEmojiImage(codepoint: string, twemoji: boolean): string {
    const normalized = normalizeCodepoint(codepoint);
    if(twemoji) return `https://raw.githubusercontent.com/jdecked/twemoji/master/assets/svg/${normalized}.svg`;
    else return `./assets/emoji/15x15/${normalized}.png`;
}

export function normalizeCodepoint(codepoint: string): string {
    const unspaced = codepoint.split(" ");
    const joined = unspaced.join("-");
    const withoutPrefix = joined.replace(/U\+/g, "");
    return withoutPrefix.toLowerCase();
}

export function codepointToEmoji(codepoint: string): string {
    const normalized = normalizeCodepoint(codepoint);
    const split = normalized.split("-");
    const final = split.map((value) => {
        const parsed = parseInt(value, 16);
        return String.fromCodePoint(parsed);
    });
    final.push("\uFE0F");
    return final.join("");
}

export function prettyCodepoint(codepoint: string): string[] {
    const normalized = normalizeCodepoint(codepoint);
    const split = normalized.split("-");
    const final = split.map((value) => {
        return "U+" + value.toUpperCase();
    });
    return final;
}

export const categories = [
    "Smileys & Emotion",
    "People & Body",
    "Animals & Nature",
    "Food & Drink",
    "Travel & Places",
    "Activities",
    "Objects",
    "Symbols",
    "Flags"
];

export interface EmojiList {
    [category: string]: EmojiData[];
}

export async function getEmojiList(): Promise<EmojiList> {
    const toReturn: EmojiList = {};
    const Emoji = (await EmojiList);

    for (const collection of (await UnicodeList).contents) {
        const category = collection.category;
        for(const subcollection of collection.contents) {
            const subcategory = subcollection.category;
            for(const emoji of subcollection.contents) {
                const name = emoji.name;
                const codepoint = normalizeCodepoint(emoji.codepoint);
                const keywords = emoji.keywords;
                let contributed = true;

                let hidden = false;
                for(const hiddenEmoji of (await HiddenEmoji).codepoints) {
                    if(hiddenEmoji === codepoint) {
                        hidden = true;
                    }
                }
                if(hidden) continue;

                let author = [];
                if(!Emoji[codepoint]) {
                    author = undefined;
                    contributed = false;
                } else author = Emoji[codepoint].author;

                if(!toReturn[category]) toReturn[category] = [];

                toReturn[category].push({
                    name,
                    codepoint,
                    category,
                    subcategory,
                    keywords,

                    author,
                    contributed
                });
            }
        }
    }

    return toReturn;
}
