<script lang="ts">
	import { Variant } from '$lib/types';
	import Button from '$lib/components/global/Button.svelte';
	let title = 'Get a quote';
	let desc = 'Ask us everything and we would love to hear from you';
	let loc: string;
	let email = 'acb@example.com';
	let phone = '(257) 563-7401';
</script>

<svelte:head>
	<title>Contact | Benson Thomas</title>
</svelte:head>

<section class="flex justify-center items-center md:m-12">
	<div class="mt-4 lg:w-1/2">
		<div
			class="w-full px-8 bg-zinc-300 py-10 mx-auto overflow-hidden shadow-2xl rounded-xl dark:bg-gray-900"
		>
			<h1 class="text-2xl md:text-4xl text-gray-600 font-bold sm:text-4xl">Get in touch with us</h1>

			<form class="mt-4">
				<div class="flex-1">
					<label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Full Name</label>
					<input
						type="text"
						placeholder="John Doe"
						class="block w-full px-5 py-3 mt-2 text-borderColor border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-bgc focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
					/>
				</div>

				<div class="flex-1 mt-6">
					<label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
					<input
						type="email"
						placeholder="johndoe@example.com"
						class="block w-full px-5 py-3 mt-2 text-borderColor border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-bgc focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
					/>
				</div>
				<div class="flex-1 mt-6">
					<label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Phone</label>
					<input
						type="tel"
						placeholder="(257) 563-7401"
						class="block w-full px-5 py-3 mt-2 text-borderColor border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-bgc focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
					/>
				</div>

				<div class="w-full mt-6">
					<label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Message</label>
					<textarea
						class="block w-full h-32 px-5 mt-2 text-borderColor placeholder-gray-400 border border-gray-200 rounded-md md:h-48 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-bgc focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
						placeholder="Message"
					/>
				</div>

				<div class="flex justify-center items-center mt-10">
					<Button href="/media" variant={Variant.outline}>Submit</Button>
				</div>
			</form>
		</div>
	</div>
</section>
