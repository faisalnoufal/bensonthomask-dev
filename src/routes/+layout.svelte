<script>
	import Nav from '$lib/components/global/Nav.svelte';
	import Footer from '$lib/components/home/Footer.svelte';
	import '../app.postcss';
	import { onMount } from 'svelte';
</script>

<!-- <div
	style="background: linear-gradient(0deg, #1F1F1F 0%, #1F1F1F 100%), #1F1F1F;"
	class="font-montserrat min-h-screen"
> -->
<div
	style="background: linear-gradient(0deg, #fff 0%, #fff 100%), #fff;"
	class="font-montserrat min-h-screen"
>
	<Nav />
	<slot />
	<Footer />
</div>

<style>
</style>
