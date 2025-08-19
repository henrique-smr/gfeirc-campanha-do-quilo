import type { Unsubscribe } from 'firebase/database';
import { auth } from '@/lib/firebase/client';
import { task } from 'nanostores';

export const onGoingTask = (unsubFactory: () => Promise<Unsubscribe | void> | Unsubscribe | void) => {
	let unsubscribe: Unsubscribe | void;
	task(async () => {
		unsubscribe = await unsubFactory();
	});
	return () => {
		if (unsubscribe) unsubscribe();
	};
}

export const afterAuthReadyOnGoingTask = (unsubFactory: () => Promise<Unsubscribe | void> | Unsubscribe | void) => {
	return onGoingTask(async () => {
		await auth.authStateReady();
		return await unsubFactory();
	})


};

