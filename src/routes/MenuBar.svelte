<script lang="ts">
    let textColor = "000000";
    let bgColor = "000000";
    let margin = ["0000", "0000"];
    let padding = ["0000", "0000", "0000", "0000"];
    let fontSize = "00";
    let indentation = "00";

    function colorInputMask(e: MouseEvent) {
        e.preventDefault();
    }
</script>

<nav class="w-full regular-border shadow-lg">
    <div class="flex divide-x-2 divide-neutral-700 *:px-3 p-2">
        <div class="flex flex-col justify-center divide-y-2 divide-neutral-700 *:flex *:flex-col *:gap-1 *:py-1.5">
            <div>
                <div class="flex items-center gap-2">
                    <label for="">Unit:</label>
                    <select id="" class="w-fit regular-input">
                        <option value="">Rem</option>
                        <option value="">Em</option>
                        <option value="">Px</option>
                        <option value="">Pt</option>
                    </select>
                </div>
            </div>
            <div>
                <label for="">Text Color</label>
                <div class="relative">
                    <p class="absolute top-1 left-2 select-none">
                        #
                    </p>
                    <input 
                        type="text" 
                        id="text-color-input" 
                        maxlength="6" 
                        class="w-[10ch] regular-input pl-5"
                        bind:value={textColor}
                        on:click={colorInputMask}
                    >
                </div>
            </div>
            <div>
                <label for="">Section Color</label>
                <div class="relative">
                    <p class="absolute top-1 left-2 select-none">
                        #
                    </p>
                    <input 
                        type="text" 
                        id="bg-color-input" 
                        maxlength="6" 
                        class="w-[10ch] regular-input pl-5"
                        bind:value={bgColor}
                        on:click={colorInputMask}
                    >
                </div>
            </div>
        </div>
        <div class="flex flex-col justify-center divide-y-2 divide-neutral-700 *:w-full *:flex *:flex-col *:gap-1 *:py-1.5">
            <div class="mb-2">
                <label for="">Margin</label>
                <div class="grid grid-cols-2 gap-2">
                    {#each margin as value}
                    <input 
                        type="text" 
                        id=""
                        maxlength="4"
                        class="text-center w-[6ch] regular-input"
                        bind:value={value}
                    >
                    {/each}
                </div>
            </div>
            <div>
                <label for="">Padding</label>
                <div class="grid grid-cols-2 grid-rows-2 gap-2">
                    {#each padding as value}
                    <input 
                        type="text" 
                        id=""
                        maxlength="4"
                        class="text-center w-[6ch] regular-input"
                        bind:value={value}
                    >
                    {/each}
                </div>
            </div>
        </div>
        <div class="flex flex-col divide-y-2 divide-neutral-700 *:flex *:items-center">
            <div class="pb-3 pt-2">
                <div class="w-full flex flex-col gap-1">
                    <label for="">
                        Font Weight
                    </label>
                    <select id="" class="w-full regular-input">
                        <option value="">Regular</option>
                        <option value="">Medium</option>
                        <option value="">Semibold</option>
                        <option value="">Bold</option>
                    </select>
                </div>
            </div>
            <div class="py-3.5">
                <label for="">
                    Font Size:
                </label>
                <input 
                    type="text" 
                    id=""
                    maxlength="2"
                    class="text-center ml-2 w-[7ch] regular-input"
                    bind:value={fontSize}
                >
            </div>
            <div class="pt-3.5 pb-1">
                <label for="">
                    Italic:
                </label>
                <select id="" class="block ml-auto w-[7ch] regular-input">
                    <option value="">No</option>
                    <option value="">Yes</option>
                </select>
            </div>
        </div>
        <div class="flex flex-col divide-y-2 divide-neutral-700 *:flex *:flex-1 *:py-1 *:items-center">
            <div>
                <label for="">
                    Indentation:
                </label>
                <input 
                    type="text" 
                    id=""
                    maxlength="2"
                    class="text-center ml-auto w-[8ch] regular-input"
                    bind:value={indentation}
                >
            </div>
            <div>
                <label for="">
                    Text Align:
                </label>
                <select id="" class="ml-2 regular-input">
                    <option value="">Left</option>
                    <option value="">Right</option>
                    <option value="">Center</option>
                    <option value="">Justify</option>
                </select>
            </div>
            <div>
                <div class="flex flex-col gap-1">
                    <label for="">
                        Decoration
                    </label>
                    <select id="" class="regular-input">
                        <option value="">None</option>
                        <option value="">Normal Underline</option>
                        <option value="">Wavy Underline</option>
                        <option value="">Normal Overline</option>
                        <option value="">Wavy Underline</option>
                        <option value="">Line Through</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</nav>

<style>
    
</style>
