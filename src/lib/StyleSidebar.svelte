<script lang="ts">
	import {
		Badge,
		Button,
		ButtonGroup,
		Card,
		Label,
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper
	} from 'flowbite-svelte';
	import { pushNewStyle, selectedStyle, styles } from './styleManager';

	let spanClass = 'flex-1 ml-3 whitespace-nowrap';
</script>

<Sidebar asideClass="w-full">
	<!-- <Badge dismissable on:click={() => console.log('clicked')}>Dismissable</Badge> -->
	<!-- <StyleTag
		onClickFunc={() => {
			console.log('hi');
		}}
		dismissable>Hello</StyleTag
	> -->
	<!-- <Card class="w-full p-6" padding="lg"> -->
	<div
		class="flex w-full flex-col rounded-lg border border-gray-200 bg-white p-4 text-gray-500 shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 sm:p-6"
	>
		<Label class="pb-6 text-center text-3xl">Styler</Label>

		<div class="flex w-full items-center justify-center">
			<ButtonGroup divClass="max-w-full overflow-x-auto whitespace-nowrap" size="sm">
				<!-- <Button>Default</Button> -->
				{#key $styles.styles}
					{#each $styles.styles as style, i}
						<Button
							outline={$styles.selected == i}
							on:click={() => {
								styles.selectStyle(i);
							}}>{style.id}</Button
						>
					{/each}
				{/key}
				<Button
					on:click={() => {
						pushNewStyle();
					}}>+</Button
				>
			</ButtonGroup>
		</div>
	</div>
	<!-- </Card
	> -->
</Sidebar>
