import React from "react";
import { QRCodeSVG } from 'qrcode.react';
import { useSsrStore } from "@/lib/useSsrStore";
import { $basket } from "@/store/basket.store";
import { generatePix } from "@/lib/pix";
import { copyTextToClipboard } from '@/lib/clipboard'

export function Pix() {
	const basket = useSsrStore($basket) ?? { items: [], total: 0 };

	const pix = React.useMemo(() => generatePix({
		chave: '30446645000113',
		cidade: 'TRES RIOS',
		valor: basket.total,
		nome: 'GRUPO DA FRATERNIDADE IRM',
		tid: 'GFEIRC'

	}), [basket.total]);

	const [showClipboardSuccess, setShowClipboardSuccess] = React.useState(false);
	return (
		<div className="modal-box w-11/12 max-w-5xl p-0! rounded-box bg-base-200 border card-border border-base-300">
			<div className="card rounded-none bg-base-200 card-border border-base-300 ">
				<div className="card-title  border-b-4 p-4 border-base-300 flex items-center">
					{/* <Icon icon="fluent-emoji-flat:basket" className="text-2xl mr-2" /> */}
					<Icon icon="ic:round-pix" className="h-10 w-10 mr-2 text-green-800" />
					<span className="text-xl font-semibold">
						Doacão via Pix
					</span>
					<form className="ml-auto" method="dialog">
						<button className="btn btn-sm btn-square btn-neutral bg-neutral/50">
							<Icon icon="ic:round-close" width={24} height={24} />
						</button>
					</form>
				</div>

				<div className="p-4 text-center">
					<p className="text-lg mb-4">Obrigado por sua contribuição!</p>
					<p className="text-md mb-4">
						Para concluir sua doação, por favor, utilize o QR code abaixo para
						fazer o pagamento via Pix.
					</p>
					<QRCodeSVG
						value={pix}
						size={200}
						className="mx-auto mb-4"
					/>
					<div className="text-sm text-gray-600">
						<p>
							Ou utilize o Pix Copie e cola:
						</p>
						<div className={`join w-full itmes-center justify-center`} >
							<input value={pix} className="input input-bordered w-full max-w-xs mt-2 join-item" readOnly />
							<button
								className={`btn btn-md btn-outline border-gray-400 mt-2 join-item ${showClipboardSuccess ? 'tooltip tooltip-open tooltip-success' : ''}`}
								onClick={async () => {
									const stat = await copyTextToClipboard(pix);
									if (stat) { setShowClipboardSuccess(true); setTimeout(() => setShowClipboardSuccess(false), 2000); } else { alert('Falha ao copiar o texto. Tente copiar diretamente do campo do Pix Copia e Cola.'); }
								}}
							>
								<div className={`tooltip-content text-[14px] p-3 font-semibold ${showClipboardSuccess ? '' : 'hidden'}`}>
									Pix copiado com sucesso!
								</div>
								Copiar
								<Icon icon="ic:round-content-copy" className="h-5 w-5 ml-2 text-gray-600" />
							</button>
						</div>
					</div>
					<p className="text-sm text-gray-600 mt-2">
						Após o pagamento, sua doação será convertida em alimentos para as famílias auxiliadas pelo GFEIRC.
						<br />
						Muito obrigado pelo seu apoio!
					</p>
				</div>
			</div>
		</div>
	);
}
import { Icon } from "@iconify/react";
