<script type="ts">
	import { browser } from '$app/environment';
	import {
		Fileupload,
		Label,
		Toast,
		Helper,
		Button,
		Chevron,
		Dropdown,
		DropdownItem,
		DropdownDivider,
		DropdownHeader,
		Select
	} from 'flowbite-svelte';
	import type NotificationHolder from './NotificationHolder.svelte';
	import { createEventDispatcher } from 'svelte';
	import { readFile } from '$lib/toolbox';
	import { base } from '$app/paths';

	export let notificationHolder: NotificationHolder;

	const dispatch = createEventDispatcher();

	function loadVTT(test: Event) {
		if (test == null) return;
		// @ts-ignore
		let file = (test.target as HTMLInputElement).files[0];

		if (file.name.endsWith('.vtt')) {
			//Read the file as text
			readFile(file, (data: string) => {
				//Read it line by line
				let lines = data.split('\n');

				//Remove the start lines (they specify the language and stuff, we dont need this)
				lines.shift();
				lines.shift();
				lines.shift();

				//get all the content(Excluding the first 3 lines), and put it back together
				let content = '\n' + lines.join('\n');

				//This splits the subtitles up by each "section"
				let sections = content.split('\r').join('').split('\n\n');
				//Remove the empty lines (there is one at the start and end)
				sections.shift();
				sections.pop();

				dispatch('rawFileData', {
					sections: sections
				});

				console.log(data);
			});
		} else {
			// @ts-ignore
			notificationHolder.pushNotif(`Cannot Load File. The file you uploaded isnt a .VTT file.`);
		}
	}

	let countries: { value: string; name: string }[] = [];

	if (browser)
		for (const [itemName, item] of Object.entries(localStorage)) {
			if (itemName.startsWith('YTCaptionsSave-')) {
				//Cut out the YTCaptionsSave- start bit of the string
				countries.push({
					value: itemName,
					name: itemName.substring('YTCaptionsSave-'.length)
				});
			}
		}
</script>

<div class="z-0 m-auto flex h-screen max-w-5xl flex-col overflow-hidden p-6 px-8">
	<img alt="Styled Youtube Captions Logo" src="{base}/Logo.svg" class="flex-none px-6" />

	<div class="flex h-full w-full flex-col place-items-center justify-center">
		<div class="flex w-4/5 flex-[0_1_0%] flex-col place-items-center justify-center px-8">
			<Label class="pb-2 text-xl text-white">Upload .VTT</Label>
			<Fileupload {...{ accept: '.vtt' }} on:change={loadVTT} />
		</div>
		<div class="flex w-4/5 flex-[0_1_0%] flex-col place-items-center px-8  pb-6">
			<Label class="pb-2 text-xl text-white">Or</Label>
			<!-- <Button><Chevron>Load Project</Chevron></Button>
			<Dropdown placement="top">
				{#each Object.entries(localStorage) as [itemName, item]}
					{#if itemName.startsWith('YTCaptionsSave-')}
						<DropdownItem>{itemName.substring('YTCaptionsSave-'.length)}</DropdownItem>
					{/if}
				{/each}
			</Dropdown> -->
			<Label for="select-lg" class="sr-only">Underline large select</Label>

			<Select
				id="select-lg"
				underline
				size="lg"
				items={countries}
				class="mb-6 w-1/4"
				placeholder="Load Save"
				value=""
			/>
		</div>
	</div>

	<footer class="absolute bottom-0 left-1/2 grid -translate-x-1/2 place-items-center p-4">
		<Label class="text-slate-900"
			>Visit <a href="https://github.com/KevinWh0/Styled-Youtube-Captions" class="text-fuchsia-500"
				>github.com/KevinWh0/Styled-Youtube-Captions</a
			> help out with this project</Label
		>
	</footer>
</div>
