<script lang="ts">
	import { Variant } from '$lib/types';
	import Button from '../global/Button.svelte';
	import type { Event } from '$lib/types';

	export let events: Event;
	export let reverse = false;

	const { title, desc, btnText, img } = events;
</script>

{#if reverse}
	<section
		class="overflow-hidden bg-gradient-to-r from-gray-100 to-gray-200 m-12 mt-1 rounded-2xl sm:grid sm:grid-cols-2 border border-gray-300"
	>
		<div
			class="p-8 md:p-12 lg:px-16 lg:py-24 mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right"
		>
			<h2 class="text-3xl font-bold text-gray-900 md:text-4xl">
				{title}
			</h2>

			<p class="hidden text-gray-600 md:mt-4 md:block text-lg">
				{desc}
			</p>

			<div class="mt-4 md:mt-8">
				<Button
					className="hover:text-white hover:bg-golden-500 bg-golden-400 text-white"
					variant={Variant.rounded}
					href="/"
				>
					{btnText}
				</Button>
			</div>
		</div>
		<img
			alt="img"
			src={img}
			class="h-56 w-full object-cover sm:h-full rounded-tl-2xl sm:rounded-tl-none shadow-md"
		/>
	</section>
{:else}
	<section
		class="overflow-hidden bg-gradient-to-r from-gray-100 to-gray-200 m-12 mt-1 rounded-2xl sm:grid sm:grid-cols-2 border border-gray-300"
	>
		<img
			alt="img"
			src={img}
			class="h-56 w-full object-cover sm:h-full rounded-tr-2xl sm:rounded-tr-none shadow-md"
		/>

		<div
			class="p-8 md:p-12 lg:px-16 lg:py-24 mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right"
		>
			<h2 class="text-3xl font-bold text-gray-600 md:text-4xl">
				{title}
			</h2>

			<p class="hidden text-gray-600/80 md:mt-4 md:block text-sm">
				{desc}
			</p>

			<div class="mt-4 md:mt-8">
				<div class="flex justify-center items-center mb-10">
					<!-- <Button variant={Variant.rounded} href="/media">More Videos</Button> -->
					<Button href="/contact" variant={Variant.outline}>Contact us</Button>
				</div>
			</div>
		</div>
	</section>
{/if}
