import React from "react";

import { EmojiData } from "src/EmojiList";

import "css/components/EmojiInfo.css";
import EmojiImage from "./EmojiImage";
import EmojiCodepoint from "./EmojiCodepoint";
import EmojiContributors from "./EmojiContributors";
import EmojiCategories from "./EmojiCategories";
import EmojiCopy from "./EmojiCopy";

interface EmojiInfoProps {
    emoji?: EmojiData;
}

export default function EmojiInfo(props: EmojiInfoProps) {
    const contributed = props.emoji ? props.emoji.contributed : false;

    return (
        <div id="emoji-info" role="group" data-contributed={contributed}>
            <EmojiImage emoji={props.emoji} />

            <EmojiCodepoint codepoint={props.emoji?.codepoint} />
            <EmojiContributors contributors={props.emoji?.author} />

            <EmojiCategories emoji={props.emoji} />

            {props.emoji && props.emoji.author ? <EmojiCopy emoji={props.emoji} /> : null}
        </div>
    );
}
