import React from "react";

interface ListCategoryButtonProps {
    onCategoryChange: (filter: string) => void;
    category: string;
    selected: boolean;
}

import smileysandemotion from "img/categories/Smileys & Emotion.svg?url";
import peopleandbody from "img/categories/People & Body.svg?url";
import animalsandnature from "img/categories/Animals & Nature.svg?url";
import foodanddrink from "img/categories/Food & Drink.svg?url";
import travelandplaces from "img/categories/Travel & Places.svg?url";
import activities from "img/categories/Activities.svg?url";
import objects from "img/categories/Objects.svg?url";
import symbols from "img/categories/Symbols.svg?url";
import flags from "img/categories/Flags.svg?url";

const categoryIcons: {[category: string]: string} = {
    "Smileys & Emotion": smileysandemotion,
    "People & Body": peopleandbody,
    "Animals & Nature": animalsandnature,
    "Food & Drink": foodanddrink,
    "Travel & Places": travelandplaces,
    "Activities": activities,
    "Objects": objects,
    "Symbols": symbols,
    "Flags": flags
};

export default function ListCategoryButton(props: ListCategoryButtonProps) {
    const icon = categoryIcons[props.category];
    const style: React.CSSProperties = {
        maskImage: `url(${icon})`,
        WebkitMaskImage: `url(${icon})`
    };

    const className = "filter-button" + (props.category === "Search" ? " search" : "");

    return (
        <button
            className={className}
            onClick={props.onCategoryChange.bind(undefined, props.category)}
            data-selected={props.selected}
            aria-label={props.category}
            title={props.category}
        >
            {
                icon ? <div className="category-icon" style={style} data-mask={icon}/> : null
            }
        </button>
    );
}
