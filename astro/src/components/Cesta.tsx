import { Icon } from "@iconify/react";
import { auth, db } from "@/lib/firebase/client";

import { $basket, removeItemFromBasket, updateItemQuantity } from "@/store/basket.store";
import { useSsrStore } from "@/lib/useSsrStore";
import { push, ref } from "firebase/database";

export function Cesta() {

	const basket = useSsrStore($basket) ?? { items: [], total: 0 };

	const handleRemoveItem = (itemId: string) => {
		removeItemFromBasket(itemId);
	};

	const handleIncrementItem = (itemId: string) => {
		updateItemQuantity(itemId, (basket.items.find(item => item.id === itemId)?.quantity || 0) + 1);
	}

	const handleDecrementItem = (itemId: string) => {
		const currentQuantity = basket.items.find(item => item.id === itemId)?.quantity || 0;
		if (currentQuantity > 1) {
			updateItemQuantity(itemId, currentQuantity - 1);
		} else {
			handleRemoveItem(itemId);
		}
	};
	const handleClickPix = () => {
		const uid = auth.currentUser?.uid || 'anon-' + Date.now();
		const modal = document.getElementById('modal-pix') as HTMLDialogElement;
		if (modal) {
			modal.showModal();
			const batch = {
				uid: uid,
				items: basket.items.map(item => ({
					id: item.id,
					name: item.name,
					quantity: item.quantity,
					price: item.price
				})),
				total: basket.total,
				timestamp: Date.now(),

			}
			console.log('Cesta de doações:', batch);
			push(ref(db, 'donations'), batch)
		}
	}

	return (
		<div className="modal-box w-11/12 max-w-5xl p-0! rounded-box bg-base-200 border card-border border-base-300">
			<div className="text-lg font-bold flex items-center gap-3 p-4 border-b-4 border-base-300">
				<Icon icon="noto:basket" className="h-10 w-10 mr-2" />
				<span className="text-xl font-semibold">
					Cesta de Doações
				</span>
				<form className="ml-auto" method="dialog">
					<button className="btn btn-sm btn-square btn-neutral bg-neutral/50">
						<Icon icon="ic:round-close" width={24} height={24} />
					</button>
				</form>
			</div>
			<div className="px-4 pb-4">
				<ul className="list">
					{!basket?.items?.length && (
						<li className="p-4 text-center">
							<p className="text-lg">Nenhum item na cesta.</p>
						</li>
					)}
					{basket?.items?.map(({ id, img, name, price, quantity, description }, index) => (
						<li key={id} className={`list-row  ${index == basket.items.length - 1 ? 'border-b border-base-300' : ''}`}>
							<div className="row-span-2 content-center!">
								<div className="avatar h-24 w-24 rounded-sm overflow-hidden">
									<img className="m-0!" src={img} />
								</div>
							</div>
							<div>
								<span className="text-sm font-semibold">
									{name}
								</span>
								<div className="font-[500] ">{description}</div>
								<div className="mt-2">R$ {(price).toFixed(2).replace(".", ",")}</div>
							</div>
							<div className="row-start-2! xs:row-start-1! flex gap-1">
								<div className="flex flex-col gap-2 items-center justify-center">
									<div className="flex gap-2 justify-center items-center">
										<button
											onClick={() => handleDecrementItem(id)}
											className="btn btn-xs xs:btn-sm btn-square btn-neutral bg-neutral/50"
										>
											<Icon icon="ic:round-remove" width={24} height={24} />
										</button>
										<span className="text-lg">{quantity}</span>
										<button
											onClick={() => handleIncrementItem(id)}
											className="btn btn-xs xs:btn-sm btn-square btn-neutral bg-neutral/50"
										>
											<Icon icon="ic:round-add" width={24} height={24} />
										</button>
									</div>
								</div>
							</div>
						</li>
					))}
					{/* asd total */}
					<li className="list-row">
						<div className=" flex gap-1 col-start-3 col-span-2">
							<div className="flex flex-col gap-2 items-center justify-center">
								<div className="text-md font-semibold">
									Total: R$ {basket?.total?.toFixed(2).replace(".", ",")}
								</div>
							</div>
						</div>
						<div className="row-start-2! col-span-4 flex justify-center">
							<form method="dialog" className="w-full">
								<button className="btn btn-md w-full text-green-100 bg-green-800/80">
									Adicionar mais itens
									<Icon
										icon="ic:round-add"
										width={24}
										height={24}
									/>
								</button>
							</form>
						</div>
					</li>
					<li className="list-row">
						<div className="col-span-4">
							<p className="text-md text-center font-[500]">
								Obrigado por sua doação!
							</p>
						</div>
						<div className="row-start-2! col-span-4 flex justify-center">
							<button
								onClick={handleClickPix}
								className="btn btn-primary btn-md"
							>
								<Icon
									icon="ic:round-pix"
									width={24}
									height={24}
								/>
								Gerar Pix
							</button>
						</div>
					</li>
				</ul>
				<div className="modal-action">
				</div>
			</div>
		</div>
	)
}
