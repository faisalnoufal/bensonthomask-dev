<script lang="ts">
	import type { Events } from '$lib/types';
	import { formatDate } from '$lib/utils';

	export let events: Events[];
	

	console.log(events);
</script>


<section class="container mx-auto w-full">
    <div class="w-full flex flex-wrap content-center justify-around mx-auto px-2 py-12 md:px-6">
        <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
            {#each events as event}
                <a href={`events/${event.slug}`} class="p-4 mb-6 flex flex-col justify-center items-center max-w-sm mx-auto">
                    <div class="h-56 w-80 rounded-lg shadow-md bg-cover bg-center" style={`background-image: url(${event.thumbnail})`}></div>
                    <div class="w-70 -mt-10 shadow-lg rounded-lg overflow-hidden p-5 bg-purple-50 hover:bg-purple-500 hover:text-white">
                        <div class="header-content inline-flex">
                            <div class="category-badge flex-1 h-4 w-4 m rounded-full m-1 bg-purple-100 blink">
                                <div class="h-2 w-2 rounded-full m-1 bg-purple-500"></div>
                            </div>
                            <div class="category-title font-medium">{formatDate(event.date)}</div>
                        </div>
                        <div class="mt-2">
                            <h2 class="text-lg font-semibold">{event.title}</h2>
                            <p class="mt-2 text-sm text-gray-500">{event.description}</p>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    </div>
</section>


<style>
    @keyframes blink {
        0%, 50%, 100% {
            opacity: 1;
        }
        25%, 75% {
            opacity: 0;
        }
    }
</style>