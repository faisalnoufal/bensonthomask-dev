<script lang="ts">
	import ShortsCarousel from '$lib/components/media/ShortsCarousel.svelte';
	import { onMount } from 'svelte';
	import { API_KEY, CHANNEL_ID } from '$lib/auth/key';
	import PageHeader from '$lib/components/global/PageHeader.svelte';

	interface Playlist {
		playlistId: string;
		playlistTitle: string;
		playlistThumbnailUrl: string;
	}

	let playlists: Playlist[] = [];
	let nextbtn: boolean = false;
	let maxResults = 40;

	async function fetchPlaylists() {
		const apiUrl = `https://www.googleapis.com/youtube/v3/playlists?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,contentDetails&maxResults=${maxResults}`;

		try {
			const response = await fetch(apiUrl);
			const data = await response.json();

			if (data.items && data.items.length > 0) {
				const fetchedPlaylists = data.items.map((item: any) => ({
					playlistId: item.id,
					playlistTitle: item.snippet.title,
					playlistThumbnailUrl: item.snippet.thumbnails.medium.url
				}));

				const sortOrder = [
					'SHORTS | Fun - Food - Travel',
					'SHORTS |  Philadelphia Full Gospel Assembly'
				];

				playlists = fetchedPlaylists.filter((playlist: Playlist) =>
					sortOrder.includes(playlist.playlistTitle)
				);

				nextbtn = true;
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	onMount(fetchPlaylists);

	let selectedVideo: string;
	let isVideoSelected: boolean = false;

	function openVideo(e: { detail: { videoId: string } }) {
		selectedVideo = e.detail.videoId;
		isVideoSelected = true;
		console.log(selectedVideo);
		console.log(isVideoSelected);
	}

	function closeVideo() {
		isVideoSelected = false;
	}

	function getYoutubeEmbedUrl(videoId: unknown) {
		console.log(videoId);
		return `https://www.youtube.com/embed/${videoId}`;
	}
</script>

{#each playlists as playlist, idx}
	<ShortsCarousel {playlist} on:video={openVideo} {idx} />
{/each}

{#if isVideoSelected}
	<div
		role="dialog"
		aria-labelledby="videoDialogTitle"
		class="fixed w-full h-full bg-[rgba(0,0,0,0.8)] flex flex-col transition-all duration-200 items-center z-40 justify-center left-0 top-0"
		on:click={closeVideo}
	>
		<button
			aria-label="Close Video"
			class="absolute top-4 right-4 p-2 bg-gray-600 text-white"
			on:click={closeVideo}
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
			src={getYoutubeEmbedUrl(selectedVideo)}
			frameborder="0"
			allowfullscreen
		/>
	</div>
{/if}
