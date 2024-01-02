import React from "react";

import CopyBox from "../CopyBox";
import { EmojiData } from "src/EmojiList";

import Cubeupload from "img/Cubeupload.svg?url";
import Github from "img/Github.svg?url";

import Link from "img/Link.svg?url";
import HTML from "img/HTML.svg?url";
import BBCode from "img/BBCode.svg?url";
import Markdown from "img/Markdown.svg?url";

import "css/components/EmojiCopy.css";

interface SliderButtonProps {
    title: string;
    setTo: string;

    id: number;
    idSelected: number;

    image: string;

    onChange: (to: string, id: number) => void;
}

export function SliderButton(props: SliderButtonProps) {
    const style = {
        maskImage: `url(${props.image})`
    };

    return (
        <button className="slider-button" title={props.title} onClick={props.onChange.bind(null, props.setTo, props.id)} data-selected={props.idSelected == props.id}>
            <div className="slider-button-icon" style={style}/>
        </button>
    );
}

export default function EmojiCopy(props: { emoji?: EmojiData }) {
    const [host, setHost] = React.useState<string>("https://u.cubeupload.com/fmji/");
    const [hostSelected, setHostSelected] = React.useState<number>(0);
    const [format, setFormat] = React.useState<string>("bbcode");
    const [formatSelected, setFormatSelected] = React.useState<number>(2);
    const imageCodepoint = props.emoji ? props.emoji.codepoint.split("-").join("") : "N/A";

    const generateCode = () => {
        const wrap = (text: string) => {
            switch (format) {
                case "raw":
                    return text;
                case "html":
                    return `<img src="${text}" alt="${props.emoji.name}" />`;
                case "bbcode":
                    return `[img=${text}]`;
                case "markdown":
                    return `![${props.emoji.name}](${text})`;
                default:
                    return text;
            }
        };

        return wrap(`${host}${imageCodepoint}.png`);
    };

    const onHostChange = (toHost: string, toSelected: number) => {
        setHost(toHost);
        setHostSelected(toSelected);
    };

    const onFormatChange = (toFormat: string, toSelected: number) => {
        setFormat(toFormat);
        setFormatSelected(toSelected);
    };

    return (
        <div id="emoji-copy">
            <div id="emoji-copy-options">
                <div id="emoji-copy-host" data-selected={hostSelected}>
                    <SliderButton title="Cubeupload" setTo="https://u.cubeupload.com/fmji/"
                        id={0} idSelected={hostSelected}
                        image={Cubeupload} onChange={onHostChange} />
                    <SliderButton title="Github" setTo="https://raw.githubusercontent.com/lopste/forumoji/main/assets/emoji/15x15/"
                        id={1} idSelected={hostSelected}
                        image={Github} onChange={onHostChange} />
                </div>
                <div id="emoji-copy-format" data-selected={formatSelected}>
                    <SliderButton title="Link" setTo="raw"
                        id={0} idSelected={formatSelected}
                        image={Link} onChange={onFormatChange} />
                    <SliderButton title="HTML" setTo="html"
                        id={1} idSelected={formatSelected}
                        image={HTML} onChange={onFormatChange} />
                    <SliderButton title="BBCode" setTo="bbcode"
                        id={2} idSelected={formatSelected}
                        image={BBCode} onChange={onFormatChange} />
                    <SliderButton title="Markdown" setTo="markdown"
                        id={3} idSelected={formatSelected}
                        image={Markdown} onChange={onFormatChange} />
                </div>
            </div>
            <CopyBox text={generateCode()} label={"Emoji Copying Area"} />
        </div>
    );
}
