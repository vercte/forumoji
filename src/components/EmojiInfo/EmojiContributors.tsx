import React from "react";

export default function EmojiContributors(props: { contributors: string[] | undefined }) {
    return (
        <div className="emoji-contributed">
            <strong>{props.contributors ? "Contributed by:" : "Not contributed"}</strong>
            {
                props.contributors ? (
                    <div className="contributors">
                        {
                            props.contributors.map((contributor, index) => (
                                <div key={index} className="contributor-name">
                                    <span>&#x2022; {contributor}</span>
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </div>
    );
}
