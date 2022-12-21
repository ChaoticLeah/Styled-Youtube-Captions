<script lang="ts">
	import {
		Textarea,
		Toolbar,
		ToolbarGroup,
		ToolbarButton,
		Button,
		Input,
		Label,
		Popover
	} from 'flowbite-svelte';
	import FaRegTrashAlt from 'svelte-icons/fa/FaRegTrashAlt.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let timeStart: string;
	export let timeEnd: string;
	export let text: string;
	export let index: number; //Used for deleting so that we know what to remove from the list

	//Makes sure it follows hh:mm:ss.ms rule by checking if its in that format and making sure the first and last char are numbers
	//Valid Example: 00:01:02.003
	const INPUT_PATTERN = /([0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3})?(^\d.*\d$)/gm;
	let inputColors: ('red' | 'base' | 'green' | undefined)[] = ['base', 'base'];

	function validateInput(event: Event) {
		const input = event.target as unknown as Input;
		const inputTime: string = input.value.trim();
		// 0 = Start Time
		// 1 = Stop Time
		const inputId = input.name == 'Start Time' ? 0 : 1;

		//Verify that the time is in the correct format
		if (!INPUT_PATTERN.test(inputTime)) {
			inputColors[inputId] = 'red';
		} else inputColors[inputId] = 'base';
	}

	function deleteCaption() {
		dispatch('delete', {
			index: index
		});
	}
</script>

<Textarea id="editor" rows="2" class="mb-4" placeholder="Write a comment" value={text}>
	<Toolbar slot="header" embedded>
		<ToolbarGroup>
			<!-- Start Time -->
			<Input
				color={inputColors[0]}
				label="Start Time"
				name="Start Time"
				required
				placeholder="H/M/S"
				pattern={INPUT_PATTERN}
				value={timeStart}
				class="!text-gray-700  dark:!text-white"
				on:change={validateInput}
			/>

			<Label>-</Label>
			<!-- End Time -->
			<Input
				color={inputColors[1]}
				label="End Time"
				name="End Time"
				required
				placeholder="H/M/S"
				pattern={INPUT_PATTERN}
				value={timeEnd}
				class="!text-gray-700  dark:!text-white"
				on:change={validateInput}
			/>
		</ToolbarGroup>

		<!-- 
	<ToolbarButton name="Apply Style to Selected"
		><svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="h-6 w-6"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
			/></svg
		></ToolbarButton
	> -->

		<ToolbarButton name="send" slot="end" on:click={deleteCaption}>
			<div class="h-5 w-5"><FaRegTrashAlt /></div>
		</ToolbarButton>
	</Toolbar>
</Textarea>
