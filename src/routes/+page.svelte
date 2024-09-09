<script lang="ts">
	import ExportButton from "./ExportButton.svelte";

	let editing = false;

	let title: string = "NeWord"
	let paragraphs: string[] = [ "Just an awesome text editor.", "Click at the 'Unlock' button to start editing this text." ];

	function textAreaKeyDown(e: KeyboardEvent & { currentTarget: EventTarget & HTMLTextAreaElement }, currentIndex: number) {
		let currentElement = document.getElementById(`p${currentIndex}`) as HTMLTextAreaElement;
		let previousElement = document.getElementById(`p${currentIndex - 1}`) as HTMLTextAreaElement;
		let nextElement = document.getElementById(`p${currentIndex + 1}`) as HTMLTextAreaElement;

		if (e.key === "Enter") {
			e.preventDefault();

			if (currentIndex == paragraphs.length - 1) {
				paragraphs = [...paragraphs, ""];
				return;
			}

			paragraphs = [
				...paragraphs.slice(0, currentIndex + 1), 
				"", 
				...paragraphs.slice(currentIndex + 1, undefined)
			];
			nextElement.focus();
		}

		else if (
			(e.key === "Backspace" || e.key === "Delete") && 
			currentElement.value.length === 0 && 
			(document.getElementById("edit-container")?.childNodes.length ?? 0) >= 2
		) {
			e.preventDefault();

			if (currentIndex == 0) {
				paragraphs = [...paragraphs.slice(1, undefined)];
				currentElement.selectionStart = 0;
				return;
			}
			else if (currentIndex == paragraphs.length - 1)
				paragraphs = [...paragraphs.slice(0, -1)];
			else
				paragraphs = [...paragraphs.slice(0, currentIndex), ...paragraphs.slice(currentIndex + 1, undefined)];
			
			previousElement.focus();
			previousElement.selectionStart = previousElement.value.length;
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
			currentIndex !== paragraphs.length - 1 &&
			currentElement.selectionEnd === currentElement.value.length
		) {
			e.preventDefault();

			nextElement.focus();
			nextElement.selectionEnd = 0;
		}
	}

	function enterEditMode() {
		if (paragraphs.length == 0)
			paragraphs = [ "" ];

		editing = true;
	}

	function exitEditMode() {
		if (paragraphs.length == 0)
			paragraphs = [ "" ];

		editing = false;
	}
</script>

<!-- Main Section: Title and Paragraphs -->
<div class="mx-auto p-4 pt-6 sm:p-8 md:p-12 md:pt-10 md:w-[680px] border-2 max-md:border-x-0 border-[var(--l-color-2)] dark:border-[var(--d-color-2)] md:rounded-lg shadow-lg">
	{#if editing}
	<textarea 
		class="block font-semibold text-2xl md:text-3xl text-center w-full bg-transparent outline-none overflow-y-clip"
		bind:value={title}
		on:keydown={
			e => {
				if (e.key == "Enter") {
					e.preventDefault();
					exitEditMode();
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
		{title} 
	</h1>
	{/if}

	<hr class="regular-hr my-6 md:mt-8 md:mb-6">

	{#if editing}
	<div class="w-full">
		<ul class="flex flex-col gap-4" id="edit-container">
			{#each paragraphs as text, i}
			<li class="flex">
				<div class="h-0 w-0 relative">
					<span class="absolute top-0.5 opacity-50 select-none">
						{i + 1}
					</span>
				</div>
				<textarea 
					autocomplete="off" 
					id="p{i}"
					class="
					text-lg indent-4
					w-full
					bg-transparent
					outline-none" 
					bind:value={text}
					on:keydown={e => textAreaKeyDown(e, i)}
				></textarea>
			</li>
			{/each}
		</ul>

		<hr class="regular-hr my-4 md:my-6">

		<button type="button" class="block md:mx-auto py-1 w-[100px] regular-border regular-button" on:click={exitEditMode}>
			Lock
		</button>
	</div>
	{:else}
	<div>
		<ul class="flex flex-col gap-4 text-lg">
			{#each paragraphs as paragraph}
			<li> {paragraph} </li>
			{/each}
		</ul>

		<hr class="regular-hr my-4 md:my-6">

		<div class="relative">
			<button type="button" class="block md:mx-auto py-1 w-[100px] regular-border regular-button" on:click={enterEditMode}>
				Unlock
			</button>
		
			<div class="absolute h-full right-0 top-0">
				<ExportButton fileContent={{"title": title, "body": paragraphs}} />
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
