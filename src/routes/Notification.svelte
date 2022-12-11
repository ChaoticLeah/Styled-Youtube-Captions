<script lang="ts">
	import { Toast } from 'flowbite-svelte';
	import { fly } from 'svelte/transition';
	import MdErrorOutline from 'svelte-icons/md/MdErrorOutline.svelte';

	export let text: string;
	export let icon: string;
	export let color:
		| 'form'
		| 'gray'
		| 'red'
		| 'yellow'
		| 'green'
		| 'indigo'
		| 'default'
		| 'purple'
		| 'pink'
		| 'blue'
		| 'light'
		| 'dark'
		| 'dropdown'
		| 'navbar'
		| 'navbarUl'
		| 'none'
		| undefined;
</script>

<Toast transition={fly} params={{ x: -200 }} {color} divClass="w-full max-w-xs p-4 m-4 mt-0">
	<svelte:fragment slot="icon">
		{#if icon == 'warn'}
			<MdErrorOutline />
		{/if}
	</svelte:fragment>
	{text}
</Toast>
