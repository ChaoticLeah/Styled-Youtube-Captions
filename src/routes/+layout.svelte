<script>
	import './styles.css';
	import '../app.css';

	export const prerender = true;
</script>

<div class="app overflow-hidden bg-gray-50 transition-colors duration-700 dark:bg-slate-900">
	<!-- <main class=""> -->
	<slot />
	<!-- </main> -->
</div>

<style>
	:global(body) {
		overflow: hidden;
	}

	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
