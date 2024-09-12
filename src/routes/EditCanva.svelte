<script lang="ts">
	import ExportButton from "./ExportButton.svelte";
    import type { Content } from "./types";


    export let editMethods: {
        exitEditMode: (content: Content) => boolean,
        enterEditMode: (content: Content) => boolean,
        textAreaKeyDown: (
            setContent: (newContent: Content) => void,
            content: Content,
            e: KeyboardEvent & { currentTarget: EventTarget & HTMLTextAreaElement }, 
            currentIndex: number
        ) => void,
        setContent: (newContent: Content) => void
    };
    
    export let editing: boolean;
    export let content: Content;
</script>

<div class="p-4 pt-6 sm:p-8 md:p-12 md:pt-10 md:w-[680px] border-2 max-md:border-x-0 border-[var(--l-color-2)] dark:border-[var(--d-color-2)] md:rounded-lg shadow-lg">
    {#if editing}
    <textarea 
        class="block font-semibold text-2xl md:text-3xl text-center w-full bg-transparent outline-none overflow-y-clip"
        bind:value={content.title}
        on:keydown={
            e => {
                if (e.key == "Enter") {
                    e.preventDefault();
                    editMethods.exitEditMode(content);
                }
            }
        }
    ></textarea>
    <div class="relative text-center w-full h-0">
        <div class="absolute w-full">
            <p class="opacity-50 select-none">
                Editable
            </p>
        </div>
    </div>
    {:else}
    <h1 class="block font-semibold text-2xl md:text-3xl text-center w-full break-words"> 
        {content.title} 
    </h1>
    {/if}

    <hr class="regular-hr my-6 md:mt-8 md:mb-6">

    {#if editing}
    <div class="w-full">
        <ul class="flex flex-col gap-4" id="edit-container">
            {#each content.sections as section, i}
            <li class="flex">
                <div class="h-0 w-0 relative">
                    <span class="absolute top-0.5 -left-4 opacity-50 select-none">
                        {i + 1}
                    </span>
                </div>
                <textarea 
                    autocomplete="off" 
                    id="p{i}"
                    class="
                    text-lg
                    w-full
                    bg-transparent
                    outline-none" 
                    bind:value={section.text}
                    on:keydown={e => editMethods.textAreaKeyDown(editMethods.setContent, content, e, i)}
                ></textarea>
            </li>
            {/each}
        </ul>

        <hr class="regular-hr my-4 md:my-6">

        <button type="button" class="block md:mx-auto py-1 w-[100px] regular-border regular-button" on:click={() => editing = editMethods.exitEditMode(content)}>
            Lock
        </button>
    </div>
    {:else}
    <div>
        <ul class="flex flex-col gap-4 text-lg">
            {#each content.sections as section}
            <li> {section.text} </li>
            {/each}
        </ul>

        <hr class="regular-hr my-4 md:my-6">

        <div class="relative">
            <button type="button" class="block md:mx-auto py-1 w-[100px] regular-border regular-button" on:click={() => editing = editMethods.enterEditMode(content)}>
                Unlock
            </button>
        
            <div class="absolute h-full right-0 top-0">
                <ExportButton fileContent={{"title": content.title, "body": content.sections}} />
            </div>
        </div>
    </div>
    {/if}
</div>

<style>
    textarea {
		resize: none;
		field-sizing: content;
	}
</style>
