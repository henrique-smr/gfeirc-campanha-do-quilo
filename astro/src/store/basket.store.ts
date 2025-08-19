import { atom } from 'nanostores'
import type { ListItem } from './list.store'

export type BasketItem = ListItem & {
	quantity: number
}

export type Basket = {
	items: BasketItem[]
	total: number
}

export const $basket = atom<Basket>({
	items: [],
	total: 0,
})

export function addItemToBasket(item: BasketItem) {
	const prev = $basket.get()
	const existingItem = prev.items.find((i) => i.id === item.id)
	let newItems;
	if (existingItem) {
		newItems = prev.items.map((i) =>
			i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
		)
	} else {
		newItems = [...prev.items, item]
	}
	const newTotal = newItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
	$basket.set(
		{
			items: newItems,
			total: newTotal,
		}
	)
}

export function removeItemFromBasket(itemId: string) {
	const prev = $basket.get()
	const newItems = prev.items.filter((i) => i.id !== itemId)
	const newTotal = newItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
	$basket.set({
		items: newItems,
		total: newTotal,
	})
}

export function clearBasket() {
	$basket.set({
		items: [],
		total: 0,
	})
}

export function updateItemQuantity(itemId: string, quantity: number) {
	const prev = $basket.get()
	const newItems = prev.items.map((i) =>
		i.id === itemId ? { ...i, quantity } : i
	)
	const newTotal = newItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
	$basket.set({
		items: newItems,
		total: newTotal,
	})
}
