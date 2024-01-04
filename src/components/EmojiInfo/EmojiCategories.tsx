import React from "react";

import { EmojiData } from "src/EmojiList";

interface EmojiNameProps {
    emoji?: EmojiData;
}

export default function EmojiCategories(props: EmojiNameProps) {
    if(!props.emoji) return (
        <>
            <div className="emoji-categories" aria-label="Category: N/A">
                <strong aria-hidden="true">Category:</strong><br aria-hidden="true" />
                <span aria-hidden="true">N/A</span>
            </div>

            <div className="emoji-keywords" aria-label="Keywords">
                <strong aria-hidden="true">Keywords:</strong><br aria-hidden="true" />
                <span>N/A</span>
            </div>
        </>
    );

    return (
        <>
            <div className="emoji-categories" aria-label={"Category: " + props.emoji.category}>
                <strong aria-hidden="true">Category:</strong><br aria-hidden="true" />
                <span aria-hidden="true">{props.emoji.category}</span>
            </div>

            <div className="emoji-keywords" aria-label="Keywords">
                <strong aria-hidden="true">Keywords:</strong><br aria-hidden="true" />
                <span>{props.emoji.keywords.join(", ")}</span>
            </div>
        </>
    );
}
