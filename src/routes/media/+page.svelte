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
                    'Music Video',
                    'ENGLISH CHRISTIAN WORSHIP - CHOIR',
                    'MINISTRY || TESTIMONY || SPEECH',
                    'ENGLISH CHRISTIAN HYMNS',
                    'MALAYALAM CHRISTIAN WORSHIP - CHOIR'
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

<svelte:head>
    <title>Media | Benson Thomas</title>
</svelte:head>

<PageHeader
    title="Media"
    centerTitle
    bgColor="#dec3a3"
    bgImg="https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
/>

{#each playlists as playlist, idx}
    <Carousel {playlist} on:video={openVideo} {idx} />
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
    class="absolute top-2 right-2 p-2 rounded-md bg-gray-800 text-white hover:opacity-80 transition duration-300 z-50"
    on:click={closeVideo}
>
    Close
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
