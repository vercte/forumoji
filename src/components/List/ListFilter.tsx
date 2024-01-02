import React from "react";

import ListCategoryButton from "./ListCategoryButton";
import { categories } from "src/EmojiList";

import "css/components/ListFilter.css";
import { RefList } from "./List";

interface ListFilterProps {
    onCategoryChange: (filter: string) => void;
    barRef: React.RefObject<HTMLDivElement>;
    categoryRefs: RefList;
    searchSelected: boolean;
    setSearchSelected: (searchSelected: boolean) => void;
}

export default function ListFilter(props: ListFilterProps) {
    const [selectedCategory, setCategory] = React.useState<string>("Smileys & Emotion");

    const changeCategory = (filter: string) => {
        if(filter == "Search") {
            props.setSearchSelected(!props.searchSelected);
            props.onCategoryChange(filter);
            return;
        }
        setCategory(filter);
        props.onCategoryChange(filter);
    };

    const tabulate = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const key = e.key;
        if (key === "ArrowLeft" || key === "ArrowRight") {
            const index = categories.indexOf(selectedCategory);
            const newIndex = (key === "ArrowLeft" ? index - 1 : index + 1) % categories.length;
            let finalIndex = newIndex;
            if(newIndex < 0) finalIndex = categories.length - 1;
            if(newIndex >= categories.length) finalIndex = 0;
            changeCategory(categories[finalIndex]);
        }
    };

    document.addEventListener("wheel", () => {
        requestAnimationFrame(() => {
            if(!props.barRef.current) return;
            const offset = props.barRef.current!.getBoundingClientRect().height;
            const scrollY = window.scrollY;
            const category = categories.find((category: string) => {
                const categoryRef = props.categoryRefs[category].current;
                if (categoryRef) {
                    const categoryY = categoryRef.getBoundingClientRect().top + scrollY;
                    return categoryY >= scrollY - offset;
                }
                return false;
            });
            if (category) {
                setCategory(category);
            }
        });
    });

    return (
        <div id="filters" ref={props.barRef}
            aria-label="Filter Toolbar" role="toolbar"
            onKeyDown={tabulate}>
            {/* <ListCategoryButton category="Search" onCategoryChange={changeCategory} selected={props.searchSelected} /> */}
            {
                categories.map((category: string) => {
                    return (
                        <ListCategoryButton key={category} category={category}
                            onCategoryChange={changeCategory} selected={category === selectedCategory ? true : false}
                        />
                    );
                })
            }
        </div>
    );
}
