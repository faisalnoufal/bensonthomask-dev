<script lang="ts">
	import { API_KEY as apiKey } from '$lib/auth/key';
	import { onMount } from 'svelte';

	let playlistVideosGraceCanopy: { videoId: string }[] = [];
	let instagramPosts: string[] = [
		'https://www.instagram.com/p/B-Xpa7Fh43c/',
		'https://www.instagram.com/p/CAjVwmQBisi/'
	];

	let selectedVideo: string | null = null;
	const playlistId = 'PLI1cvwejI5Sth63AUaRXTlfPtt59o2Jwt';

	// Fetch videos from the specified playlist
	async function fetchPlaylistVideosGraceCanopy() {
		try {
			const cachedVideos = localStorage.getItem('cachedplaylistVideosGraceCanopy');

			if (cachedVideos) {
				playlistVideosGraceCanopy = JSON.parse(cachedVideos);
			} else {
				const response = await fetch(
					`https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${playlistId}&part=snippet&maxResults=12`
				);

				if (response.ok) {
					const data: any = await response.json();

					if (data.items?.length > 0) {
						playlistVideosGraceCanopy = data.items.map((item: any) => ({
							videoId: item.snippet.resourceId.videoId
						}));

						// Store playlist videos in local storage for caching
						localStorage.setItem(
							'cachedplaylistVideosGraceCanopy',
							JSON.stringify(playlistVideosGraceCanopy)
						);
					}
				} else {
					throw new Error('Failed to fetch playlist videos');
				}
			}
		} catch (error) {
			console.error('Error fetching playlist videos:', error);
		}
	}

	// Fetch playlist videos when the component mounts
	onMount(() => {
		fetchPlaylistVideosGraceCanopy();

		// Dynamically add Instagram embed script to the document body
		const script = document.createElement('script');
		script.src = 'https://www.instagram.com/embed.js';
		script.async = true;
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	});

	function openVideo(videoId: string) {
		selectedVideo = videoId;
	}
</script>

<svelte:head>
	<title>Grace Canopy | Benson Thomas</title>
</svelte:head>

<h1 class="my-10 text-2xl md:text-4xl text-gray-600 font-bold text-center">Gracecanopy</h1>
<p class="w-5/6 md:w-1/2 text-sm -mt-5 text-gray-600/80 mb-10 text-center mx-auto">
	Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere voluptate eaque, illum est
	tempore asperiores ipsa odio! Quia blanditiis, ut dolore beatae accusantium, laboriosam fugiat
	maxime, accusamus praesentium reprehenderit quod.
</p>

<h1 class="font-medium uppercase p-4 md:p-12 text-gray-600 text-xl text-center">
	Church | Benson Thomas
</h1>

<div class="flex flex-wrap justify-center mx-4 mb-4 lg:mx-24">
	{#if playlistVideosGraceCanopy.length > 0}
		{#each playlistVideosGraceCanopy as video}
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
		<p class="">No videos available</p>
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

<h1 class="font-medium uppercase p-4 md:p-12 text-gray-600 text-xl text-center">Instagram Posts</h1>

<div class="flex flex-wrap justify-evenly mx-4 mb-4 lg:mx-24">
	{#each instagramPosts as post}
		<blockquote
			class="instagram-media aspect-auto m-2 md:w-[24rem] mx-auto"
			data-instgrm-permalink={post}
			data-instgrm-version="13"
			style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"
		/>
	{/each}
</div>
