import React, { ForwardedRef } from "react";

import ListItem from "./ListItem";
import { EmojiData } from "src/EmojiList";

interface ListCategoryProps {
    category: string;
    emojis: EmojiData[];
    selectedEmoji?: EmojiData;
    headingRef: ForwardedRef<HTMLHeadingElement>;
    onEmojiChange: (emoji: EmojiData) => void;
}

export default function ListCategory(props: ListCategoryProps) {
    return (
        <div className="list-category" data-category={props.category}>
            <h2 ref={props.headingRef}>{props.category}</h2>
            <div className="emoji-icons">
                {
                    props.emojis.map((emoji: EmojiData) => {
                        return <ListItem emoji={emoji} key={emoji.codepoint} onClick={(emoji: EmojiData) => () => props.onEmojiChange(emoji)} selected={props.selectedEmoji?.codepoint === emoji.codepoint}/>;
                    })
                }
            </div>
        </div>
    );
}
