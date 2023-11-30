<script lang="ts">
	import { API_KEY as apiKey, CHANNEL_ID as channelId } from '$lib/auth/key';
	import { onMount } from 'svelte';
	import Button from '../global/Button.svelte';
	import { Variant } from '$lib/types';
  
	let latestVideos: { title: string; videoId: string }[] = [];
  
	// Fetch the latest video data
	async function fetchLatestVideos() {
	  try {
		const response = await fetch(
		  `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&order=date&type=video&part=snippet&maxResults=12`
		);
  
		const data: any = await response.json();
  
		if (data.items?.length > 0) {
		  latestVideos = data.items.map((item: any) => ({
			title: item.snippet.title,
			videoId: item.id.videoId
		  }));
		}
	  } catch (error) {
		console.error('Error fetching latest videos:', error);
	  }
	}
  
	// Fetch the latest video when the component mounts
	onMount(fetchLatestVideos);
  </script>
  
  <!-- <h1 class="my-10 text-2xl md:text-4xl text-bgc font-bold text-center">What we have for you</h1>
  <p class="w-5/6 md:w-1/2 text-sm -mt-5 text-bgc/80 mb-10 text-center mx-auto">
	Excepteur dolor id aliqua occaecat ipsum. Nostrud culpa labore velit nisi et amet velit nisi minim
	officia dolore. Consequat laborum commodo consectetur consectetur ullamco et aliqua irure duis
	sunt anim minim.
  </p>
  <div class="flex flex-wrap justify-center mx-4 my-10">
	{#if latestVideos.length > 0}
	  {#each latestVideos as video}
		<div class="m-2 w-auto h-auto md:w-80">
		  <iframe
			title=""
			class="rounded-lg w-full"
			src={`https://www.youtube.com/embed/${video.videoId}`}
			frameborder="0"
			allowfullscreen
		  />
		</div>
	  {/each}
	{:else}
	  <p>No videos available</p>
	{/if}
  </div>
  <div class="flex justify-center mb-10">
	<Button variant={Variant.rounded} href="/media">More Videos</Button>
  </div>
   -->

   <h1 class="my-10 text-2xl md:text-4xl text-bgc font-bold text-center">Check Out Our Latest Videos</h1>

<p class="w-5/6 md:w-1/2 text-sm -mt-5 text-bgc/80 mb-10 text-center mx-auto">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</p>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center mx-4 my-10">
  {#if latestVideos.length > 0}
    {#each latestVideos as video}
      <div class="bg-white rounded-lg overflow-hidden shadow-md">
        <iframe
          title=""
          class="w-full h-48 object-cover"
          src={`https://www.youtube.com/embed/${video.videoId}`}
          frameborder="0"
          allowfullscreen
        />
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-2">{video.title}</h3>
          <a href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noopener noreferrer" class="text-blue-500">Watch on YouTube</a>
        </div>
      </div>
    {/each}
  {:else}
    <p class="text-center text-gray-500">No videos available</p>
  {/if}
</div>

<div class="flex justify-center mb-10">
  <Button variant={Variant.rounded} href="/media">More Videos</Button>
</div>