import React from "react";

import Header from "./Header";
import EmojiInfo from "./EmojiInfo/";
import { EmojiData } from "src/EmojiList";

import "css/components/Sidebar.css";

interface SidebarProps {
    emoji?: EmojiData;
}

export default function Sidebar(props: SidebarProps) {
    return (
        <div id="sidebar">
            <Header />
            <EmojiInfo emoji={props.emoji}/>
        </div>
    );
}
