import type { Content } from "./types";


function textAreaKeyDown(setContent: (newContent: Content) => void, content: Content, e: KeyboardEvent & { currentTarget: EventTarget & HTMLTextAreaElement }, currentIndex: number) {
    let currentElement = document.getElementById(`p${currentIndex}`) as HTMLTextAreaElement;
    let previousElement = document.getElementById(`p${currentIndex - 1}`) as HTMLTextAreaElement;
    let nextElement = document.getElementById(`p${currentIndex + 1}`) as HTMLTextAreaElement;

    if (e.key === "Enter") {
        e.preventDefault();

        if (currentIndex == content.sections.length - 1) {
            content.sections = [...content.sections, { text: "", style: undefined }];
            setContent(content);
            return;
        }

        content.sections = [
            ...content.sections.slice(0, currentIndex + 1), 
            { text: "", style: undefined }, 
            ...content.sections.slice(currentIndex + 1, undefined)
        ];

        nextElement.focus();

        setContent(content);
    }

    else if (
        (e.key === "Backspace" || e.key === "Delete") && 
        currentElement.value.length === 0 && 
        (document.getElementById("edit-container")?.childNodes.length ?? 0) >= 2
    ) {
        e.preventDefault();

        if (currentIndex == 0) {
            content.sections = [...content.sections.slice(1, undefined)];
            currentElement.selectionStart = 0;
            setContent(content);
            return;
        }
        else if (currentIndex == content.sections.length - 1)
            content.sections = [...content.sections.slice(0, -1)];
        else
            content.sections = [...content.sections.slice(0, currentIndex), ...content.sections.slice(currentIndex + 1, undefined)];
        
        previousElement.focus();
        previousElement.selectionStart = previousElement.value.length;

        setContent(content);
    }

    else if (
        (e.key === "ArrowUp" || e.key === "ArrowLeft") &&
        currentIndex !== 0 &&
        currentElement.selectionStart === 0
    ) {
        e.preventDefault();

        previousElement.focus();
        previousElement.selectionStart = previousElement.value.length;
    }

    else if (
        (e.key === "ArrowDown" || e.key === "ArrowRight") &&
        currentIndex !== content.sections.length - 1 &&
        currentElement.selectionEnd === currentElement.value.length
    ) {
        e.preventDefault();

        nextElement.focus();
        nextElement.selectionEnd = 0;
    }
}


function enterEditMode(content: Content): boolean {
    if (content.sections.length == 0)
        content.sections = [ { text: "", style: undefined } ];

    return true;
}


function exitEditMode(content: Content): boolean {
    if (content.sections.length == 0)
        content.sections = [ { text: "", style: undefined } ];

    return false;
}


export {
    textAreaKeyDown,
    enterEditMode,
    exitEditMode
};
