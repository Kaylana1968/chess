"use client";
import { Link } from "lucide-react";

export default function ButtonWithImageAndText() {
	return (
		<button className="flex cursor-pointer items-center rounded-md bg-neutral-800 px-4 py-2">
			<Link className="mr-2" />
			<span className="font-semibold">Create a link</span>
		</button>
	);
}
