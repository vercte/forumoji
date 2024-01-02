import React from "react";

import "css/components/CopyBox.css";

interface CopyBoxProps {
    text: string;
    label: string;
}

export default function CopyBox(props: CopyBoxProps) {
    const [copied, setCopied] = React.useState(false);

    function copyText() {
        navigator.clipboard.writeText(props.text).then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 1000);
        });
    }

    return (
        <div className="copy-box">
            <input type="text" value={props.text} readOnly={true} aria-label={props.label} />
            <button onClick={copyText}>{copied ? "Copied!" : "Copy"}</button>
        </div>
    );
}
