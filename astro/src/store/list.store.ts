import { atom, onMount, task } from 'nanostores';
import { db } from '@/lib/firebase/client';
import { ref, onValue } from 'firebase/database';
import { afterAuthReadyOnGoingTask } from './utils';

export type ListItem = {
	id: string;
	name: string;
	price: number;
	description?: string;
	img: string;
};

export const $list = atom<ListItem[]>([]);

onMount($list, () => {
	const listRef = ref(db, 'list');
	afterAuthReadyOnGoingTask(async () => onValue(listRef, (snapshot) => {
		const data: Record<string, ListItem> | null = snapshot.val();
		if (data) {
			const items: ListItem[] = Object.entries(data).map(([id, item]) => ({
				id,
				name: item.name,
				price: item.price,
				img: item.img,
				description: item.description || '',
			}));
			$list.set(items);
		} else {
			$list.set([]);
		}
	}))
})
