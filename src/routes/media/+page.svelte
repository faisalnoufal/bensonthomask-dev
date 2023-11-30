<!-- <script lang="ts">
	import Carousel from '../../lib/components/media/Carousel.svelte';
	import { onMount } from 'svelte';
	import { API_KEY, CHANNEL_ID } from '$lib/auth/key';
	import PageHeader from '$lib/components/global/PageHeader.svelte';

	interface Playlist {
		playlistId: string;
		playlistTitle: string;
		playlistThumbnailUrl: string;
	}

	let playlists: Playlist[] = [];
	let excludedPlaylists: Playlist[];
	let nextbtn: boolean = false;
	let maxResults = 40;

	async function fetchPlaylists() {
		const apiUrl = `https://www.googleapis.com/youtube/v3/playlists?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,contentDetails&maxResults=${maxResults}`;

		try {
			const response = await fetch(apiUrl);
			const data = await response.json();

			if (data.items) {
				const fetchedPlaylists = data.items.map((item: any) => ({
					playlistId: item.id,
					playlistTitle: item.snippet.title,
					playlistThumbnailUrl: item.snippet.thumbnails.medium.url
				}));

				const sortOrder = [
					'Music Video',
					'ENGLISH CHRISTIAN WORSHIP - CHOIR',
					'MINISTRY || TESTIMONY || SPEECH',
					'ENGLISH CHRISTIAN HYMNS',
					'MALAYALAM CHRISTIAN WORSHIP - CHOIR'
				];

				playlists = fetchedPlaylists.filter((playlist: Playlist) =>
					sortOrder.includes(playlist.playlistTitle)
				);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	onMount(fetchPlaylists);

	function loadExcludedPlaylist() {
		playlists = excludedPlaylists;
		nextbtn = false;
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	function getYoutubeEmbedUrl(videoId: unknown) {
		return `https://www.youtube.com/embed/${videoId}`;
	}

	let selectedVideo: string;
	let isVideoSelected: boolean = false;

	function openVideo(e: { detail: { videoId: string } }) {
		selectedVideo = e.detail.videoId;
		isVideoSelected = true;
	}
</script> -->

<script lang="ts">
	import Carousel from '../../lib/components/media/Carousel.svelte';
	import { onMount } from 'svelte';
	import { API_KEY, CHANNEL_ID } from '$lib/auth/key';
	import PageHeader from '$lib/components/global/PageHeader.svelte';

	interface Playlist {
		playlistId: string;
		playlistTitle: string;
		playlistThumbnailUrl: string;
	}

	let playlists: Playlist[] = [];
	let excludedPlaylists: Playlist[];
	let nextbtn: boolean = false;
	let maxResults = 40;

	// Function to fetch playlists from the API
	async function fetchPlaylists() {
		// Check if playlists are already stored in local storage
		const cachedPlaylists = localStorage.getItem('cachedPlaylists');

		if (cachedPlaylists) {
			playlists = JSON.parse(cachedPlaylists);
		} else {
			// Fetch playlists from the API
			const apiUrl = `https://www.googleapis.com/youtube/v3/playlists?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,contentDetails&maxResults=${maxResults}`;

			try {
				const response = await fetch(apiUrl);
				const data = await response.json();

				if (data.items) {
					const fetchedPlaylists = data.items.map((item: any) => ({
						playlistId: item.id,
						playlistTitle: item.snippet.title,
						playlistThumbnailUrl: item.snippet.thumbnails.medium.url
					}));

					const sortOrder = [
						'Music Video',
						'ENGLISH CHRISTIAN WORSHIP - CHOIR',
						'MINISTRY || TESTIMONY || SPEECH',
						'ENGLISH CHRISTIAN HYMNS',
						'MALAYALAM CHRISTIAN WORSHIP - CHOIR'
					];

					playlists = fetchedPlaylists.filter((playlist: Playlist) =>
						sortOrder.includes(playlist.playlistTitle)
					);

					// Store playlists in local storage for caching
					localStorage.setItem('cachedPlaylists', JSON.stringify(playlists));
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}
	}

	onMount(fetchPlaylists);

	function loadExcludedPlaylist() {
		// Clear playlists from local storage when loading excluded playlists
		localStorage.removeItem('cachedPlaylists');

		playlists = excludedPlaylists;
		nextbtn = false;
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	function getYoutubeEmbedUrl(videoId: unknown) {
		return `https://www.youtube.com/embed/${videoId}`;
	}

	let selectedVideo: string;
	let isVideoSelected: boolean = false;

	function openVideo(e: { detail: { videoId: string } }) {
		selectedVideo = e.detail.videoId;
		isVideoSelected = true;
	}
</script>

<!-- rest of the code remains unchanged -->

<svelte:head>
	<title>Media | Benson Thomas</title>
</svelte:head>

<!-- <PageHeader
    title="Media"
    centerTitle
    bgColor="#dec3a3"
    bgImg="https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  /> -->

{#each playlists as playlist}
	<Carousel {playlist} on:video={openVideo} />
{/each}

{#if nextbtn}
	<div
		class="rounded-md bg-accent px-5 py-2.5 text-sm font-medium w-min text-text shadow hover:scale-105 active:scale-95 transition-all duration-150 block mx-auto my-0"
		on:click={loadExcludedPlaylist}
	>
		Next
	</div>
{/if}

{#if isVideoSelected}
	<div
		class="fixed w-full h-full bg-[rgba(0,0,0,0.8)] flex flex-col transition-all duration-200 items-center z-40 justify-center left-0 top-0"
		role="dialog"
		on:click={() => (isVideoSelected = false)}
	>
		<button
			class="absolute top-4 right-4 p-2 bg-gray-700 text-white"
			on:click={() => (isVideoSelected = false)}
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
