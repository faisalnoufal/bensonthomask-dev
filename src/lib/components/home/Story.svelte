<script lang="ts">
	import type { Story, StoryData } from '$lib/types';
	import { slide } from 'svelte/transition';

	interface Data {
		story: Story;
		storyData: StoryData[];
	}

	export let data: Data;

	const { supTitle, title } = data.story;

	const poster = data.storyData;

	// let supTitle = 'Veniam nostrud officia eu dolor enim.';
	// let title = 'Non consequat qui eiusmod magna ipsum tempor.';

	// let poster = [
	// 	{
	// 		imgUrl: 'https://dev.bensonthomask.com/wp-content/uploads/2023/06/moses.png',
	// 		posterTitle: 'Amet et elit exercitation.',
	// 		posterDesc: `“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus
	// 					libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus
	// 					assumenda”.`
	// 	},
	// 	{
	// 		imgUrl:
	// 			'https://dev.bensonthomask.com/wp-content/uploads/2023/06/Screenshot-2023-06-01-at-6.59.31-AM.png',
	// 		posterTitle: 'Amet et elit exercitation.',
	// 		posterDesc: `“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus
	// 					libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus
	// 					assumenda”.`
	// 	},
	// 	{
	// 		imgUrl: 'https://dev.bensonthomask.com/wp-content/uploads/2023/06/moses.png',
	// 		posterTitle: ' elit exercitation.',
	// 		posterDesc: `“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus
	// 					libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus
	// 					assumenda”.`
	// 	},
	// 	{
	// 		imgUrl: 'https://dev.bensonthomask.com/wp-content/uploads/2023/06/moses.png',
	// 		posterTitle: 'et elit exercitation.',
	// 		posterDesc: `“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus
	// 					libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus
	// 					assumenda”.`
	// 	},
	// 	{
	// 		imgUrl:
	// 			'https://dev.bensonthomask.com/wp-content/uploads/2023/06/Screenshot-2023-06-01-at-6.59.31-AM.png',
	// 		posterTitle: 'Amet et elit.',
	// 		posterDesc: `“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus
	// 					libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus
	// 					assumenda”.`
	// 	}
	// ];

	let count = 0;
	let isDisabledL = false;
	let isDisabledR = false;
	function incrementCounter() {
		if (count < poster.length) {
			if (count == poster.length - 1) {
				isDisabledR = true;
			} else {
				isDisabledR = false;
			}
			if (count == 0) {
				isDisabledL = true;
			} else {
				isDisabledL = false;
			}
			count = count + 1;
		}
	}
	function decrementCounter() {
		if (count < poster.length) {
			if (count == 1) {
				isDisabledL = true;
			} else {
				isDisabledL = false;
			}
			if (count == poster.length) {
				isDisabledR = true;
			} else {
				isDisabledR = false;
			}
			count = count - 1;
			console.log(poster[count]);
		}
	}
</script>

<section class="xl:mx-auto max-w-screen-xl mx-5 mt-1 rounded-2xl m-20 bg-bgc">
	<!-- <section class="xl:mx-auto max-w-screen-xl mx-5 mt-1 rounded-2xl m-20 bg-bgc dark:bg-gray-900"> -->
	<div class="max-w-6xl px-6 py-10 mx-auto">
		<p class="text-xl font-medium text-borderColor/90">{supTitle}</p>

		<h1 class="mt-2 text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">
			<!-- <h1 class="mt-2 text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white"> -->
			{title}
		</h1>

		<main class="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
			<div class="absolute w-full bg-borderColor -z-10 md:h-96 rounded-2xl" />

			<div
				transition:slide
				class="w-full p-6 bg-borderColor md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly"
			>
				<img
					class="h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl"
					src={poster[count].imgUrl}
					alt={title}
				/>

				<div class="mt-2 md:mx-6">
					<div>
						<p class="text-xl font-medium tracking-tight text-white">{poster[count].posterTitle}</p>
						<!-- <p class="text-borderColor">Marketing Manager at Stech</p> -->
					</div>

					<p class="mt-4 text-lg leading-relaxed text-white md:text-xl">
						{poster[count].posterDesc}
					</p>

					<div class="flex items-center justify-between mt-6 md:justify-start">
						<button
							title="left arrow"
							disabled={isDisabledL}
							on:click={decrementCounter}
							class="p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100 hover:bg-borderColor"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-6 h-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
							</svg>
						</button>

						<button
							on:click={incrementCounter}
							disabled={isDisabledR}
							title="right arrow"
							class="p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100 md:mx-6 hover:bg-borderColor"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-6 h-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</main>
	</div>
</section>
