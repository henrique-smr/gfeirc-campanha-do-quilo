import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import type { ReadableAtom, WritableAtom } from "nanostores";

export const useSsrStore = <T extends (WritableAtom<any> | ReadableAtom<any>),>(atom: T) => {
	const storeValue = useStore(atom);
	const [data, setData] = useState<typeof storeValue>();

	useEffect(() => {
		setData(storeValue);
	}, [storeValue]);

	return data;
}
