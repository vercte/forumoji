import React from "react";

import { prettyCodepoint } from "src/EmojiList";

export default function EmojiCodepoint(props: { codepoint: string | undefined }) {
    const codepoint = props.codepoint ? prettyCodepoint(props.codepoint).join(" ") : "N/A";

    return (
        <p className="emoji-codepoint" aria-label="Codepoint">{codepoint}</p>
    );
}
