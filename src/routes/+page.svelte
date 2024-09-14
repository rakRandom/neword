<script lang="ts">
	import EditCanva from "./EditCanva.svelte";
	import MenuBar from "./MenuBar.svelte";
	import { enterEditMode, exitEditMode, textAreaKeyDown } from "./utilsEdit";
	import type { Content } from "./types";

	let editing = true;

	let content: Content = {
		title: "NeWord",
		sections: [ 
			{
				text: "Just an awesome text editor.",
				style: undefined
			}, 
			{
				text: "Click at the 'Unlock' button to start editing this text.",
				style: undefined
			} 
		]
	};

	function setContent(newContent: Content) {
		content = newContent;
	}
</script>

<!-- Main Section: Title and Sections -->
<div class="flex flex-col gap-8 mx-auto w-fit pt-16">
	{#if editing}
	<MenuBar />
	{/if}
	
	<EditCanva 
		editMethods={{enterEditMode, exitEditMode, textAreaKeyDown, setContent}}
		bind:editing
		bind:content
	/>
</div>

<style>
	
</style>
