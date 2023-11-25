<script lang="ts">
	import PageHeader from '$lib/components/global/PageHeader.svelte';
	import { formatDate } from '$lib/utils';
	import { FastAverageColor } from 'fast-average-color';

	export let data;

	let bgColor: string;
	const fac = new FastAverageColor();
	fac
		.getColorAsync(data.meta.thumbnail)
		.then((color) => {
			bgColor = color.rgba;
		})
		.catch((e) => {
			console.log(e);
		});
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="text-white text-center mb-8">
	<PageHeader title={data.meta.title} bgImg={data.meta.thumbnail} {bgColor} />
	<!-- Title -->
	<hgroup>
		<!-- <h1 class="text-amber-200"><b class="text-lg">{data.meta.title}</b></h1> -->
		<p>Event Date: <b class="text-amber-200"> {formatDate(data.meta.date)} </b></p>
	</hgroup>

	<!-- Tags -->
	<!-- <div class="tags">
		{#each data.meta.categories as category}
			<span class="surface-4">&num;{category}</span>
		{/each}
	</div> -->

	<!-- Post -->
	<div class="prose text-center mx-auto mt-4">
		<svelte:component this={data.content} />
	</div>
</article>

<style>
	article {
		max-inline-size: var(--size-content-3);
		margin-inline: auto;
	}

	h1, p {
		color: white;
	}

	h1 {
		text-transform: capitalize;
	}

	h1 + p {
		margin-top: var(--size-2);
	}

	.tags {
		display: flex;
		gap: var(--size-3);
		margin-top: var(--size-7);
	}

	.tags > * {
		padding: var(--size-2) var(--size-3);
		border-radius: var(--radius-round);
	}

	.prose {
		text-align: center;
		max-width: 80%; /* Limit width to 80% on desktop */
		margin-bottom: var(--size-4); /* Bottom margin for gap */
	}

	@media (max-width: 768px) {
		/* Media query for mobile devices */
		.prose {
			max-width: 90%; /* Limit width to 90% on mobile */
		}
	}
</style>
