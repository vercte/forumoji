import React from "react";

import { EmojiData } from "src/EmojiList";

interface EmojiNameProps {
    emoji?: EmojiData;
}

export default function EmojiCategories(props: EmojiNameProps) {
    if(!props.emoji) return (
        <>
            <div className="emoji-categories">
                <strong>Category:</strong><br />
                <span>N/A</span>
            </div>

            <div className="emoji-keywords">
                <strong>Keywords:</strong><br />
                <span>N/A</span>
            </div>
        </>
    );

    return (
        <>
            <div className="emoji-categories">
                <strong>Category:</strong><br />
                <span>{props.emoji.category}</span>
            </div>

            <div className="emoji-keywords">
                <strong>Keywords:</strong><br />
                <span>{props.emoji.keywords.join(", ")}</span>
            </div>
        </>
    );
}
