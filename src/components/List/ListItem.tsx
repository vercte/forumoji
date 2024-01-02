import React from "react";
import { brokenImage, getEmojiImage, EmojiData } from "src/EmojiList";

interface ListItemProps {
    onClick: (emoji: EmojiData) => () => void;
    emoji: EmojiData;
    selected: boolean;
}

export default function ListItem(props: ListItemProps) {
    const src = getEmojiImage(props.emoji.codepoint, !props.emoji.contributed);

    return (
        <button className="list-item"
            data-name={props.emoji.name}
            data-contributed={props.emoji.contributed}
            onClick={props.onClick(props.emoji)}
            aria-label={props.emoji.name}
            title={props.emoji.name}
            data-selected={props.selected}
        >
            <img src={src} onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = brokenImage;
            }} loading="lazy"/>
        </button>
    );
}
