import React from "react";

import InfoTray from "components/Sidebar";
import List from "src/components/List/List";
import { EmojiData } from "./EmojiList";

import "css/App.css";

export default function App() {
    const [emoji, setEmoji] = React.useState<EmojiData>();

    function changeEmoji(toEmoji: EmojiData) {
        setEmoji(toEmoji);
    }

    return (
        <>
            <InfoTray emoji={emoji}/>
            <List onEmojiChange={changeEmoji}/>
        </>
    );
}
