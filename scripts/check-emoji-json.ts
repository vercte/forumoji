import fs from "fs";

const emojiJson = fs.readFileSync("../assets/emoji.json", "utf8");
const emojiData = JSON.parse(emojiJson);

const emojiList = fs.readdirSync("../assets/emoji/15x15");
for(const emoji of emojiList) {
    const codepoint = emoji.replace(".png", "");
    console.info(`Checking ${codepoint}`);
    if(!emojiData[codepoint]) {
        console.info(`Missing emoji data for ${codepoint}`);
    }
}
