<!-- <script lang="ts">
	import { API_KEY as apiKey, CHANNEL_ID as channelId } from '$lib/auth/key';
	import { onMount } from 'svelte';
	import Button from '../global/Button.svelte';
	import { Variant } from '$lib/types';
  
	let latestVideos: { videoId: string }[] = [];
	let selectedVideo: string | null = null;
  
	// Fetch the latest video data
	async function fetchLatestVideos() {

	  try {
		const response = await fetch(
		  `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&order=date&type=video&part=snippet&maxResults=12`
		);
  
		const data: any = await response.json();
  
		if (data.items?.length > 0) {
		  latestVideos = data.items.map((item: any) => ({
			videoId: item.id.videoId
		  }));
		}
	  } catch (error) {
		console.error('Error fetching latest videos:', error);
	  }
	}
  
	// Fetch the latest video when the component mounts
	onMount(fetchLatestVideos);
  
	function openVideo(videoId: string) {
	  selectedVideo = videoId;
	}
  </script> -->

<script lang="ts">
	import { API_KEY as apiKey, CHANNEL_ID as channelId } from '$lib/auth/key';
	import { onMount } from 'svelte';
	import Button from '../global/Button.svelte';
	import { Variant } from '$lib/types';

	let latestVideos: { videoId: string }[] = [];
	let selectedVideo: string | null = null;

	// Function to fetch the latest video data
	async function fetchLatestVideos() {
		try {
			// Check if videos are already stored in local storage
			const cachedVideos = localStorage.getItem('cachedLatestVideos');

			if (cachedVideos) {
				latestVideos = JSON.parse(cachedVideos);
			} else {
				// Fetch videos from the API
				const response = await fetch(
					`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&order=date&type=video&part=snippet&maxResults=12`
				);

				const data: any = await response.json();

				if (data.items?.length > 0) {
					latestVideos = data.items.map((item: any) => ({
						videoId: item.id.videoId
					}));

					// Store videos in local storage for caching
					localStorage.setItem('cachedLatestVideos', JSON.stringify(latestVideos));
				}
			}
		} catch (error) {
			console.error('Error fetching latest videos:', error);
		}
	}

	// Fetch the latest video when the component mounts
	onMount(fetchLatestVideos);

	function openVideo(videoId: string) {
		selectedVideo = videoId;
	}
</script>

<!-- rest of the code remains unchanged -->

<h1 class="my-10 text-2xl md:text-4xl text-bgc font-bold text-center">What we have for you</h1>
<p class="w-5/6 md:w-1/2 text-sm -mt-5 text-bgc/80 mb-10 text-center mx-auto">
	Excepteur dolor id aliqua occaecat ipsum. Nostrud culpa labore velit nisi et amet velit nisi minim
	officia dolore. Consequat laborum commodo consectetur consectetur ullamco et aliqua irure duis
	sunt anim minim.
</p>
<div class="flex flex-wrap justify-center mx-4 my-10">
	{#if latestVideos.length > 0}
		{#each latestVideos as video}
			<div class="m-2 w-auto h-auto md:w-80">
				<div class="relative">
					<img
						alt="Video Thumbnail"
						src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
						class="rounded-lg cursor-pointer"
						on:click={() => openVideo(video.videoId)}
					/>
				</div>
			</div>
		{/each}
	{:else}
		<p>No videos available</p>
	{/if}
</div>

{#if selectedVideo !== null}
	<div
		class="fixed w-full h-full bg-[rgba(0,0,0,0.8)] flex flex-col transition-all duration-200 items-center z-40 justify-center left-0 top-0"
	>
		<button
			class="absolute top-4 right-4 p-2 bg-gray-700 text-white"
			on:click={() => (selectedVideo = null)}
		>
			<svg
				aria-hidden="true"
				focusable="false"
				role="img"
				class="w-6 h-6"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				style="display:inline-block;user-select:none;vertical-align:text-bottom;overflow:visible; width: 30px; height: 30px;"
			>
				<path
					d="M5.72 5.72a.75.75 0 0 1 1.06 0L12 10.94l5.22-5.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L13.06 12l5.22 5.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L12 13.06l-5.22 5.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L10.94 12 5.72 6.78a.75.75 0 0 1 0-1.06Z"
				/>
			</svg>
		</button>
		<iframe
			title=""
			class="w-4/5 relative rounded-lg transition-all duration-200 aspect-video lg:h-[70%] border-[none]"
			src={`https://www.youtube.com/embed/${selectedVideo}`}
			frameborder="0"
			allowfullscreen
		/>
	</div>
{/if}

<!-- <div class="flex justify-center mb-10"> -->
<div class="flex justify-center items-center mb-10">
	<!-- <Button variant={Variant.rounded} href="/media">More Videos</Button> -->
	<Button href="/media" variant={Variant.outline}>More Videos</Button>
</div>
