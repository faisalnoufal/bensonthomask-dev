<script>
	import { API_KEY, CHANNEL_ID } from '$lib/auth/key';
	import { onMount } from 'svelte';

	let isLive = false;
	let videoId = '';
	// const defaultVideoId = 'zftKyphUW5g'; // Set your default video ID
	const defaultVideoId = 'UL-gLnq2wfc'; // Set your default video ID

	async function checkLiveStatus() {
		try {
			const apiKey = API_KEY;
			const channelId = CHANNEL_ID;

			const response = await fetch(
				`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`
			);

			const data = await response.json();

			if (data.items.length > 0) {
				isLive = true;
				videoId = data.items[0].id.videoId;
			}
		} catch (error) {
			console.error('Error checking live status:', error);
		}
	}

	onMount(checkLiveStatus);
</script>

<svelte:head>
	<title>Live | Benson Thomas</title>
</svelte:head>

<main>
	<div class="flex flex-col justify-center items-center w-screen h-[80vh] relative rounded-lg">
		{#if isLive}
			<iframe
				class="w-full h-full absolute p-10 rounded-lg"
				src={`https://www.youtube.com/embed/${videoId}`}
				frameborder="0"
				allowfullscreen
			/>
		{:else}
			<!-- Display the default video if live is not available -->
			<p
				class="z-10 absolute uppercase top-0 text-lg font-semibold text-center text-bgc capitalize lg:text-xl"
			>
				No live stream is currently happening.
			</p>
			<iframe
				class="w-full h-full absolute p-10 rounded-lg top-4"
				src={`https://www.youtube.com/embed/${defaultVideoId}`}
				frameborder="0"
				allowfullscreen
			/>
		{/if}
	</div>
</main>
