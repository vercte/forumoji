import React from "react";

export default function EmojiContributors(props: { contributors: string[] | undefined }) {
    return (
        <div className="emoji-contributed" aria-label={props.contributors ? "Contributed by:" : "Not contributed"}>
            <strong aria-hidden="true">{props.contributors ? "Contributed by:" : "Not contributed"}</strong>
            {
                props.contributors ? (
                    <div className="contributors" role="list">
                        {
                            props.contributors.map((contributor, index) => (
                                <div key={index} className="contributor-name" role="listitem">
                                    <span aria-hidden="true">&#x2022; </span><span>{contributor}</span>
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </div>
    );
}
