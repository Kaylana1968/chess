import { CornerDownRight } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
	return (
		<main className="flex h-screen items-center justify-center bg-[url(/background.png)] bg-cover py-10">
			<div className="flex w-120 flex-col gap-2 rounded border border-neutral-600 bg-neutral-800 p-4 text-white">
				<h2 className="text-3xl">You seem to be lost</h2>

				<p>Consider learning geography you son of an American</p>

				<Link
					href="/"
					className="flex w-min items-center gap-2 rounded border border-neutral-600 px-2 py-1 whitespace-nowrap hover:border-neutral-500 hover:active:opacity-50"
				>
					<CornerDownRight size={16} /> To home page
				</Link>
			</div>
		</main>
	);
}
