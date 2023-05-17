<script lang="ts">
    import Select from "svelte-select/Select.svelte";


const items = [
		{value: 1, label: '1 Main'},
	];
</script>


<Select {items} containerStyles="first-letter:text-red-500" class="first-letter:text-red-500"  showChevron>
</Select>	