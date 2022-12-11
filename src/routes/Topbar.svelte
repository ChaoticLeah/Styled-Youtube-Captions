<script lang="ts">
	import { base } from '$app/paths';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button, Input } from 'flowbite-svelte';
	import DarkModeToggle from './DarkModeToggle.svelte';
	import LangSwitcher from './LangSwitcher.svelte';

	export let Class: string | undefined = undefined;
	// let classes = class ? class : "";
</script>

<Navbar let:hidden let:toggle navClass={Class}>
	<NavBrand href="{base}/">
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			Styled Youtube Captions
		</span>
	</NavBrand>
	<div class="flex md:order-2">
		<LangSwitcher />
		<DarkModeToggle />
	</div>
	<NavUl {hidden} class="order-1">
		<NavLi href="{base}/" active={true}>Home</NavLi>
		<NavLi href="{base}/about">About</NavLi>
		<NavLi href="https://github.com/KevinWh0/Styled-Youtube-Captions">Github</NavLi>
	</NavUl>
</Navbar>
