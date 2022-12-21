<script lang="ts">
	import Notification from './Notification.svelte';
	import type { notificationColor } from './types/colors';

	let Notifications: { icon: any; text: string; color: notificationColor }[] = [];

	export function pushNotif(
		text: string,
		icon: string = 'warn',
		color: notificationColor = 'yellow'
	) {
		Notifications = [
			...Notifications,
			{
				icon: icon,
				text: text,
				color: color
			}
		];
	}

	$: Notifications = Notifications;
</script>

<div class={` ${$$props.class}`}>
	{#each Notifications as { icon, text, color }, i}
		<Notification {text} {icon} {color} />
	{/each}
</div>
