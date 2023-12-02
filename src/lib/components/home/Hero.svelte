<script lang="ts">
	import type { Hero } from '$lib/types';
	import { Variant } from '$lib/types';
	import Button from '../global/Button.svelte';
	import img from '$lib/assets/benson3.png';

	export let heroData: Hero;
	const Headshot = heroData.img;
	const tagline = heroData.title;
	const description = heroData.description;
	const CTA = {
		//   url: heroData.btnUrl,
		url: '/contact',
		text: heroData.btnText
	};
</script>

<section
	class="relative m-10 md:mx-12 mt-10 rounded-2xl bg-zinc-300 min-h-fit shadow-sm shadow-borderColor"
>
	<div class="mx-auto max-w-screen-xl">
		<div
			class="flex md:flex-row flex-col h-full justify-between px-10 xl:px-10 md:px-20 gap-8 items-center"
		>
			<div class="lg:order-last md:pb-20">
				<div class="relative max-w-xs mx-auto">
					<div
						class="grid items-end overflow-hidden drop-shadow-xl"
						style="aspect-ratio: 1/1.5; border-radius: 0 0 ;"
					>
						<div
							style="inset: auto 0 0; "
							class=" border-4 border-borderColor aspect-square rounded-tl-[80px] rounded-br-[80px] absolute mx-auto w-full object-cover"
						/>
						<div
							style="inset: auto 0 0; "
							class="border-b-4 border-r-4 border-borderColor z-30 aspect-square rounded-tl-[80px] rounded-br-[80px] absolute mx-auto w-full object-cover"
						/>
						{#if Headshot}
							<img alt="Headshot" src={Headshot} class="relative z-20 rounded-br-[80px]" />
						{:else}
							<img alt="Headshot" src={img} class="relative z-20 rounded-br-[80px]" />
						{/if}
					</div>
				</div>
			</div>

			<div class="z-10 justify-center pb-12 lg:pb-0">
				<h2 class="text-2xl md:text-4xl text-gray-600 font-bold sm:text-4xl">Hi I'm</h2>
				<h2 class="text-2xl md:text-4xl text-gray-600 font-bold sm:text-4xl">{tagline}</h2>

				{#if description}
					<p class="mt-4 text-gray-600 md:text-lg text-ellipsis md:w-96 font-lora mb-10">
						{description}
					</p>
				{/if}

				{#if CTA}
					<Button href={CTA.url} variant={Variant.outline}>{CTA.text}</Button>
				{/if}
			</div>
		</div>
	</div>
</section>
