import React from "react";

import ListCategory from "./ListCategory";
import ListFilter from "./ListFilter";
import { EmojiData, getEmojiList } from "src/EmojiList";

import "css/components/List.css";

interface ListProps {
    onEmojiChange: (emoji: EmojiData) => void;
}

export type RefList = {
    [category: string]: React.RefObject<HTMLHeadingElement>;
}

export default function List(props: ListProps) {
    const [selectedEmoji, setSelectedEmoji] = React.useState<EmojiData | undefined>(undefined);
    const [searchSelected, setSearchSelected] = React.useState<boolean>(false);

    function onEmojiChange(toEmoji: EmojiData) {
        setSelectedEmoji(toEmoji);
        props.onEmojiChange(toEmoji);
    }

    const list = getEmojiList();
    const categoryBarRef = React.createRef<HTMLDivElement>();
    const categoryRefs: RefList = {};

    function onCategoryChange(filter: string) {
        if(filter === "Search") {
            return;
        }
        setSearchSelected(false);
        const offset = categoryBarRef.current!.getBoundingClientRect().height;
        const y = categoryRefs[filter].current!.getBoundingClientRect().bottom + window.scrollY - offset;

        window.scrollTo({top: y, behavior: "smooth"});
    }

    return (
        <div id="list">
            <ListFilter onCategoryChange={onCategoryChange} barRef={categoryBarRef}
                categoryRefs={categoryRefs}
                searchSelected={searchSelected} setSearchSelected={setSearchSelected}/>
            <div id="list-items">
                {
                    Object.entries(list).map(([category, emojis]) => {
                        if(category === "Component") return null;
                        categoryRefs[category] = React.createRef<HTMLHeadingElement>();
                        return (
                            <ListCategory
                                key={category}
                                category={category}
                                emojis={emojis}
                                onEmojiChange={onEmojiChange}
                                headingRef={categoryRefs[category]}
                                selectedEmoji={selectedEmoji}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
}
