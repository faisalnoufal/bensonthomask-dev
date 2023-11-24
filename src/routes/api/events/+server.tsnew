import { json } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

import type { Events } from '$lib/types';

async function getEvents() {
	let events: Events[] = [];

	const eventsDirectory = 'src/data/events'; // Adjust the path based on your project structure

	try {
		const files = await fs.readdir(eventsDirectory);

		for (const file of files) {
			const filePath = path.join(eventsDirectory, file);
			console.log('Reading file:', filePath);

			const content = await fs.readFile(filePath, 'utf-8');
			console.log('File content:', content);

			const { data } = matter(content);
			console.log('Parsed frontmatter:', data);

			const slug = file.replace('.md', '');
			const event = { ...data, slug } as Events;

			if (event.published) {
				events.push(event);
			}
		}

		events.sort(
			(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
		);

		console.log('Fetched events:', events);
	} catch (error) {
		console.error('Error reading events:', error.message);
		throw error; // Propagate the error to notify the application
	}

	return events;
}

export async function GET() {
	try {
		const events = await getEvents();
		return json({
			events
		});
	} catch (error) {
		return json({ error: error.message }, 500); // Return an error response
	}
}
