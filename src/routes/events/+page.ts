// import type { Events } from '$lib/types';

// export async function load({ fetch }) {
// 	const response = await fetch('api/events');
// 	const events = await response.json();
// 	return { events };
// }

import type { Events } from '$lib/types';

export async function load({ fetch }) {
	try {
		const response = await fetch('api/events');

		if (!response.ok) {
			throw new Error(`Failed to fetch events. Status: ${response.status}`);
		}

		const events: Events[] = await response.json();
		console.log('Fetched events:', events);

		return { events };
	} catch (error) {
		console.error('Error fetching events:', error.message);
		throw error; // Propagate the error to notify the application
	}
}
