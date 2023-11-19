<script lang="ts">
    import { Splide, SplideSlide } from '@splidejs/svelte-splide';
    import '@splidejs/svelte-splide/css';
    import { onMount, createEventDispatcher } from 'svelte';
    import Card from './Card.svelte';
    import { API_KEY as apiKey } from '$lib/auth/key';

    export let idx: number;
    export let playlist: Playlist;

    interface YoutubePlaylistItem {
        id: string;
        snippet: {
            title: string;
            thumbnails: {
                default: { url: string };
                high: { url: string };
                maxres: { url: string };
            };
            resourceId: { videoId: string };
        };
    }

    let playlistItems: YoutubePlaylistItem[] = [];

    const dispatch = createEventDispatcher();

    onMount(async () => {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${playlist.playlistId}&part=snippet&maxResults=10`
        );
        const data = await response.json();
        playlistItems = data.items;
    });

    const openVideo = (videoId: string) => {
        dispatch('video', { videoId });
    };

</script>

<div class="flex flex-col justify-center items-center overflow-hidden mb-8">
    <h1 class="text-bgc mx-auto my-2 text-xl font-semibold font-lora">{playlist.playlistTitle}</h1>
    <Splide
        options={{
            lazyLoad: 'nearby',
            rewind: true,
            drag: 'free',
            autoplay: 'pause',
            width: '80vw',
            autoWidth: true,
        }}
        aria-label={playlist.playlistTitle}
    >
        {#each playlistItems as item (item.id)}
            <SplideSlide class="h-60 aspect-video w-auto">
                <div on:click={() => openVideo(item.snippet.resourceId.videoId)}>
                    <Card title={item.snippet.title} imgUrl={item.snippet.thumbnails.high.url} />
                </div>
            </SplideSlide>
        {/each}
    </Splide>
</div>
