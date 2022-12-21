<script type="ts">
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
		DropdownHeader
	} from 'flowbite-svelte';
	import { fly } from 'svelte/transition';

	import NotificationHolder from '$lib/NotificationHolder.svelte';
	import LangSwitcher from '$lib/LangSwitcher.svelte';
	import DarkModeToggle from '$lib/DarkModeToggle.svelte';
	import StartPage from './StartPage.svelte';
	import Caption from '$lib/Caption.svelte';
	import StyleSidebar from '$lib/StyleSidebar.svelte';
	import Topbar from '$lib/Topbar.svelte';
	import { Pane, Splitpanes } from 'svelte-splitpanes';

	let notificationHolder: NotificationHolder;

	let showStartPage = true;

	let currentProjectData: {
		name: string;
		transcript: { time: { start: string; end: string }; text: string }[];
	} = {
		name: 'autosave',
		transcript: []
	};

	function handleRawFileData(event: { detail: { sections: string[] } }) {
		const sections = event.detail.sections;

		showStartPage = false;
		//Add all the sections to the page
		for (let i = 0; i < sections.length; i++) {
			//Split the text from the timing data in the file
			let lines: string | string[] = sections[i].split('\n');
			let times = lines[0].split(' --> ');
			lines.shift();
			lines = lines.join('\n');

			//Add the subtitle (Dont use .push since it wont update the html)
			currentProjectData.transcript = [
				...currentProjectData.transcript,
				{ time: { start: times[0], end: times[1] }, text: lines }
			];
		}
	}

	function deleteCaption(event: CustomEvent<Caption>) {
		currentProjectData.transcript.splice(event.detail.index, 1);
		//Update it
		currentProjectData.transcript = [...currentProjectData.transcript];
	}
</script>

<svelte:head>
	<title>Styled Youtube Captions</title>
	<meta name="description" content="An app for creating custom captions on youtube" />
</svelte:head>
<div class="flex h-screen w-screen flex-col">
	<!-- Start Page -->
	{#if showStartPage}
		<Topbar />
		<StartPage {notificationHolder} on:rawFileData={handleRawFileData} />
	{:else}
		<div hidden={showStartPage} class="grid h-full grid-cols-6">
			<Topbar Class="col-start-1 col-end-7 row-start-1 row-end-auto" />

			<div class="col-start-1 col-end-5 row-start-2 row-end-auto overflow-y-scroll p-2">
				{#each currentProjectData.transcript as item, i}
					<Caption
						text={item.text}
						timeStart={item.time.start}
						timeEnd={item.time.end}
						index={i}
						on:delete={deleteCaption}
					/>
				{/each}
			</div>
			<div class="col-start-5 col-end-7 row-start-2 row-end-auto p-2">
				<StyleSidebar />
			</div>
			<!-- <Splitpanes class="default-theme" style="height: 100%; width:100vw">
			<Pane minSize={'40'} class="dark:!bg-slate-900">
				<div class="h-full overflow-y-scroll  p-12">
					{#each currentProjectData.transcript as item, i}
						<Caption
							text={item.text}
							timeStart={item.time.start}
							timeEnd={item.time.end}
							index={i}
							on:delete={deleteCaption}
						/>
					{/each}
				</div>
			</Pane>
			<Pane minSize={'10'} size={'20'} class=" dark:!bg-slate-900"><StyleSidebar /></Pane>
		</Splitpanes> -->
		</div>
	{/if}

	<!-- TODO: SAVE, and LOAD under styler panel? -->
</div>

<NotificationHolder bind:this={notificationHolder} class="absolute bottom-0 left-0 z-50" />
<div class="absolute bottom-0 right-0 z-50 m-4 flex w-1/6">
	<!-- <LangSwitcher />

	<DarkModeToggle /> -->
</div>

<style>
	@tailwind base;

	/* Firefox */
	* {
		scrollbar-width: thin;
		scrollbar-color: var(--secondary) var(--primary);
	}

	/* Chrome, Edge, and Safari */
	*::-webkit-scrollbar {
		width: 15px;
	}

	*::-webkit-scrollbar-track {
		background: var(--primary);
		border-radius: 5px;
	}

	*::-webkit-scrollbar-thumb {
		background-color: var(--secondary);
		border-radius: 14px;
		border: 3px solid var(--primary);
	}

	@tailwind components;
	@tailwind utilities;
</style>
