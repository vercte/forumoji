import React from "react";

import EmojiName from "./EmojiName";
import { brokenImage, getEmojiImage, EmojiData } from "src/EmojiList";

export default function EmojiImage(props: { emoji?: EmojiData }) {
    const name = props.emoji ? props.emoji.name : "no emoji selected";
    const imageSrc = props.emoji ? getEmojiImage(props.emoji.codepoint, !props.emoji.contributed) : brokenImage;

    return (
        <>
            <figure>
                <EmojiName emoji={props.emoji} />
                <img className="emoji-image" src={imageSrc} alt={name} loading="lazy" onError={
                    (e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = brokenImage;
                    }
                }/>
            </figure>
            <strong aria-hidden="true">Normal Size:</strong>
            <div id="emoji-preview" aria-label="Normal Sized" role="group">
                <img className="emoji-image-small" src={imageSrc} alt={name} loading="lazy" onError={
                    (e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = brokenImage;
                    }
                }/>
                <img className="emoji-image-small" src={imageSrc} alt={name} loading="lazy" onError={
                    (e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = brokenImage;
                    }
                }/>
            </div>
        </>
    );
}
