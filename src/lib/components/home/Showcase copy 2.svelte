<script lang="ts">
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
  </script>
  
  <h1 class="my-10 text-2xl md:text-4xl text-bgc font-bold text-center">What we have for you</h1>
  <p class="w-5/6 md:w-1/2 text-sm -mt-5 text-bgc/80 mb-10 text-center mx-auto">
	Excepteur dolor id aliqua occaecat ipsum. Nostrud culpa labore velit nisi et amet velit nisi minim officia dolore.
	Consequat laborum commodo consectetur consectetur ullamco et aliqua irure duis sunt anim minim.
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
	<div class="fixed w-full h-full bg-[rgba(0,0,0,0.8)] flex flex-col transition-all duration-200 items-center z-40 justify-center left-0 top-0">
	  <button
		class="absolute top-4 right-4 p-2 rounded-full bg-gray-800 text-white"
		on:click={() => (selectedVideo = null)}
	  >
		Close
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
  