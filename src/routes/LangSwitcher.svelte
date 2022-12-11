<script type="ts">
	import { Select, Label } from 'flowbite-svelte';
	import FaLanguage from 'svelte-icons/fa/FaLanguage.svelte';

	let languages: { value: string; name: string }[] = [
		{
			value: 'WORK IN PROGRESS',
			name: 'WORK IN PROGRESS'
		}
	];
	//TODO: Make it so that it saves the selected language
	//https://phrase.com/blog/posts/a-step-by-step-guide-to-svelte-localization-with-svelte-i18n-v3/
</script>

<!-- <div class="h-9 w-9">
    <Label><FaLanguage></FaLanguage></Label>
</div> -->
<Select
	id="select-lg"
	underline
	size="sm"
	items={languages}
	class=""
	placeholder="Switch Language"
	value=""
/>
