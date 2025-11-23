"use client";

import { usePathname } from "next/navigation";

export default function Lobby() {
	const pathname = usePathname();
	return <p>Link of the room: dualchess{pathname}</p>;
}
