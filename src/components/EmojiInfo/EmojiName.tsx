import React from "react";
import { codepointToEmoji, EmojiData } from "src/EmojiList";

interface EmojiNameProps {
    emoji: EmojiData;
}

export default function EmojiName(props: EmojiNameProps) {
    const name = props.emoji ? props.emoji.name : "no emoji selected";
    const realEmoji = props.emoji ? codepointToEmoji(props.emoji.codepoint) : "\u2753";

    return (
        <figcaption className="emoji-name">{realEmoji} {name}</figcaption>
    );
}
