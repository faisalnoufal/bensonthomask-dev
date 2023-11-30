<!-- <script lang="ts">
	import { API_KEY as apiKey } from '$lib/auth/key';
	import { onMount } from 'svelte';
  
	let playlistVideos: { videoId: string }[] = [];
	let churchReels: string[] = [
	  'https://www.facebook.com/reel/1540221803185787',
	  'https://www.facebook.com/reel/1201671043674926',
	  'https://www.facebook.com/reel/163908496359124',
	  'https://www.facebook.com/reel/1392526778231644',
	  'https://www.facebook.com/reel/552959363519904'
	];
	let selectedVideo: string | null = null;
	const playlistId = 'PLUhJyvkLp-rOWUDtYfsacytiHts2TV2mY';
  
	// Fetch videos from the specified playlist
	async function fetchPlaylistVideos() {
	  try {
		const response = await fetch(
		  `https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${playlistId}&part=snippet&maxResults=12`
		);
  
		if (!response.ok) {
		  throw new Error('Failed to fetch playlist videos');
		}
  
		const data: any = await response.json();
  
		if (data.items?.length > 0) {
		  playlistVideos = data.items.map((item: any) => ({
			videoId: item.snippet.resourceId.videoId
		  }));
		}
	  } catch (error) {
		console.error('Error fetching playlist videos:', error);
	  }
	}
  
	// Fetch playlist videos when the component mounts
	onMount(fetchPlaylistVideos);
  
	function openVideo(videoId: string) {
	  selectedVideo = videoId;
	}
  </script> -->

<script lang="ts">
	import { API_KEY as apiKey } from '$lib/auth/key';
	import { onMount } from 'svelte';

	let playlistVideos: { videoId: string }[] = [];
	let churchReels: string[] = [
		'https://www.facebook.com/reel/1540221803185787',
		'https://www.facebook.com/reel/1201671043674926',
		'https://www.facebook.com/reel/163908496359124',
		'https://www.facebook.com/reel/1392526778231644',
		'https://www.facebook.com/reel/552959363519904'
	];
	let selectedVideo: string | null = null;
	const playlistId = 'PLUhJyvkLp-rOWUDtYfsacytiHts2TV2mY';

	// Function to fetch playlist videos from the API
	async function fetchPlaylistVideos() {
		try {
			// Check if playlist videos are already stored in local storage
			const cachedPlaylistVideos = localStorage.getItem('cachedPlaylistVideos');

			if (cachedPlaylistVideos) {
				playlistVideos = JSON.parse(cachedPlaylistVideos);
			} else {
				// Fetch playlist videos from the API
				const response = await fetch(
					`https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${playlistId}&part=snippet&maxResults=12`
				);

				if (!response.ok) {
					throw new Error('Failed to fetch playlist videos');
				}

				const data: any = await response.json();

				if (data.items?.length > 0) {
					playlistVideos = data.items.map((item: any) => ({
						videoId: item.snippet.resourceId.videoId
					}));

					// Store playlist videos in local storage for caching
					localStorage.setItem('cachedPlaylistVideos', JSON.stringify(playlistVideos));
				}
			}
		} catch (error) {
			console.error('Error fetching playlist videos:', error);
		}
	}

	// Function to fetch Facebook reels from local storage
	function fetchCachedChurchReels() {
		const cachedChurchReels = localStorage.getItem('cachedChurchReels');
		if (cachedChurchReels) {
			churchReels = JSON.parse(cachedChurchReels);
		}
	}

	// Fetch playlist videos and Facebook reels when the component mounts
	onMount(() => {
		fetchPlaylistVideos();
		fetchCachedChurchReels();
	});

	function openVideo(videoId: string) {
		selectedVideo = videoId;
	}
</script>

<h1 class="my-10 text-2xl md:text-4xl text-bgc font-bold text-center">Thanks Almighty!</h1>
<p class="w-5/6 md:w-1/2 text-sm -mt-5 text-bgc/80 mb-10 text-center mx-auto">
	Thankful to the Almighty for the opportunity to be associated and have experienced worship in the
	Christian and Missionary Alliance Church, Church of God &amp; Philadelphia Full Gospel Assembly.
</p>

<h1 class="font-semibold p-4 md:p-12 text-bgc text-xl md:text-2xl text-center">
	Church | Benson Thomas
</h1>

<div class="flex flex-wrap justify-center mx-4 mb-4 lg:mx-24">
	{#if playlistVideos.length > 0}
		{#each playlistVideos as video}
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

<h1 class="font-semibold p-4 md:p-12 text-bgc text-xl md:text-2xl text-center">
	Church Fellowship Ministry [Reels]
</h1>

<div class="flex flex-wrap justify-center mx-4 mb-4 lg:mx-24">
	{#each churchReels as reel}
		<div class="m-2 w-80 video-card aspect-video">
			{#if reel.includes('facebook.com')}
				<iframe
					title=""
					class="rounded-lg w-full"
					height="560"
					src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
						reel
					)}&show_text=0&width=560`}
					frameborder="0"
					allowfullscreen
				/>
			{:else}
				<iframe
					title=""
					class="rounded-lg cursor-pointer w-full h-full"
					height="682"
					src={`https://www.youtube.com/embed/${reel}`}
					frameborder="0"
					allowfullscreen
				/>
			{/if}
		</div>
	{/each}
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
