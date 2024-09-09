<script lang="ts">
    type FileContent = {
        title: string,
        body: string[]
    };

    export let fileContent: FileContent;

    function download(content: string, type: string, extension: string) {
        const link = document.createElement("a");
        let filename: string = "sample";

        if (fileContent.title.trim() !== "")
            filename = fileContent.title.toLowerCase().replace(" ", "_");

        const file = new Blob([content], { type: type });

        link.href = URL.createObjectURL(file);
        link.download = `${filename}.${extension}`;
        link.click();
        URL.revokeObjectURL(link.href);
    }
    
    function downloadPlainText() {
        let text = `*** ${fileContent.title} ***\n`;

        fileContent.body.forEach(paragraph => {
            text += `\n${paragraph}\n`;
        });

        download(text, "text/plain", "txt");
    }

    function downloadMarkdown() {
        let text = `# ${fileContent.title}\n`;

        fileContent.body.forEach(paragraph => {
            text += `\n${paragraph}\n`;
        });

        download(text, "text/markdown", "md");
    }

    function downloadJSONFile() {
        download(JSON.stringify(fileContent, null, 4), "application/json", "json");
    }

    let active = false;
</script>

<div class="relative w-[150px]">
    <button 
        type="button" 
        class="block py-1 ml-auto md:mr-auto w-[100px] regular-border regular-button"
        on:click={() => active = !active}
        >
        Export <p class="ml-2 inline-block text-sm transition-transform duration-500" class:rotate-180={active}> V </p>
    </button>

    {#if active}
    <ul class="
        absolute top-12
        divide-y divide-[var(--d-color-2)] 
        p-2 w-full
        bg-[var(--l-color-1)] dark:bg-[var(--d-color-1)] regular-border shadow-lg

        *:w-full *:*:w-full *:*:text-left
        
        *:*:px-4 *:*:py-2 
        hover:*:*:bg-[var(--l-color-2)] dark:hover:*:*:bg-[var(--d-color-2)]">
        <li>
            <button type="button" on:click={downloadPlainText}>
                Plain Text
            </button>
        </li>
        <li>
            <button type="button" on:click={downloadMarkdown}>
                Markdown
            </button>
        </li>
        <li>
            <button type="button" on:click={downloadJSONFile}>
                JSON File
            </button>
        </li>
    </ul>
    {/if}
</div>

<style>

</style>
