import { Icon } from "@iconify/react";
import { $list, type ListItem } from "@/store/list.store";
import { useSsrStore } from "@/lib/useSsrStore";
import { addItemToBasket } from "@/store/basket.store";

function ListaItem({ img, name, description, price, id }: ListItem) {
	const handleClickDoar = () => {
		const modal = document.getElementById('modal-doacao') as HTMLDialogElement;
		if (modal) {
			addItemToBasket({
				id: id,
				name: name,
				price: price,
				quantity: 1,
				img: img,
				description: description || "",
			})
			modal.showModal();
		}
	}
	return (
		<li className="list-row">
			<div className="row-span-2 content-center!">
				<div className="avatar h-24 w-24 rounded-sm overflow-hidden bg-base-300">
					<img className="m-0!" src={img} />
				</div>
			</div>
			<div>
				<span className="font-bold">{name}</span>
				<div className="text-xs text-left font-semibold">{description}</div>
			</div>
			<div className="not-sm:row-start-2! flex gap-1">
				<div className="">
					<span className="h-8 border-2 badge  font-[500]">R$ {(price).toFixed(2).replace(".", ",")}</span>
				</div>
				<button
					className="btn btn-sm btn-primary"
					onClick={handleClickDoar}
				>
					{/* <button className="btn btn-sm btn-secondary bg-green-500 border-green-500"> */}
					<Icon icon="mdi:heart-plus-outline" className="h-4 w-4" />
					Doar
				</button>
			</div>
		</li>
	);
}

export function Lista() {
	const list = useSsrStore($list);
	if (!list?.length) {
		return (
			<div className="card rounded-none bg-base-200 card-border border-base-300 ">
				<div className="card-title  border-b-4 p-4 border-base-300 flex items-center">
					<Icon icon="solar:box-bold-duotone" className="h-10 w-10 mr-2 text-amber-900" />
					<span className="text-2xl font-semibold">
						Monte sua cesta de doações
					</span>
				</div>
				<div className="p-4 text-center">
					<p className="text-lg">Nenhum item encontrado.</p>
				</div>
			</div>
		);
	}
	return (
		<div className="card rounded-none bg-base-200 card-border border-base-300 ">
			<div className="card-title  border-b-4 p-4 border-base-300 flex items-center">
				{/* <Icon icon="fluent-emoji-flat:basket" className="text-2xl mr-2" /> */}
				<Icon icon="solar:box-bold-duotone" className="h-10 w-10 mr-2 text-amber-900" />
				<span className="text-2xl font-semibold">
					Monte sua cesta de doações
				</span>
			</div>

			<ul className="list">
				{
					list.map((item) => (
						<ListaItem
							key={item.id}
							id={item.id}
							img={item.img}
							name={item.name}
							description={item.description || ""}
							price={item.price}
						/>
					))
				}
				{/* <ListaItem */}
				{/* 	img={IMG.src} */}
				{/* 	name="Feijão" */}
				{/* 	quantity="1kg" */}
				{/* 	price="5,00" */}
				{/* /> */}
			</ul>

			{/* <div className="flex flex-col gap-4  p-4"> */}
			{/* </div> */}
		</div>
	);
}
