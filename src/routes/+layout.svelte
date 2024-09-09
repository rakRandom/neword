<script lang="ts">
	import { onMount } from "svelte"

    let body: HTMLBodyElement;

    onMount(() => {
        body = document.querySelector("body") as HTMLBodyElement;

        // Setting the theme based on the user preference
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
        if (darkThemeMq.matches) {
            body.classList.add("dark")
        }
    })
</script>

<div class="flex flex-col min-h-screen pt-16 pb-4 md:pt-12">
    <!-- Theme Toggle Button -->
    <button 
        on:click={() => {
            body.classList.toggle("dark");
        }}
        type="button" 
        class="absolute font-semibold top-4 left-4 h-[35px] aspect-square border-2 border-orange-500 dark:border-neutral-700 rounded-md">
        O
    </button>

    <div class="absolute top-5 right-4 text-black dark:text-white select-none">
        Your progress is not saved
    </div>

    <slot></slot>

    <!-- Link to my github -->
    <p class="mt-8 text-center">
        Made by: <a href="https://github.com/rakRandom" class="hover:underline" target="_blank">rakRandom</a>
    </p>

    <div class="flex-1 flex items-end ml-4 mt-16 text-black dark:text-white dark:opacity-10 select-none">
        the light theme is terrible, i know
    </div>
</div>

<style>
	
</style>
