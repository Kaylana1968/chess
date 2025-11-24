"use client";

import Button from "@/components/button";
import { useRouter } from "next/navigation";

interface RoomCreationResponse {
	id: string;
}
export default function Home() {
	const router = useRouter();

	async function handleCreateRoom() {
		try {
			const res = await fetch("/api/room", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				}
			});

			if (!res.ok) {
				throw new Error(
					`Failed to create room: ${res.status} ${res.statusText}`
				);
			}

			const data: RoomCreationResponse = await res.json();
			const roomId = data.id;

			console.log("Room created with ID:", roomId);

			router.push(`/room/${roomId}`);
		} catch (error) {
			console.error("Error creating room:", error);
		}
	}

	return (
		<>
			<h1 className="mt-60 text-center text-5xl">Dual Chess</h1>
			<div className="mt-10 flex justify-center">
				<Button
					color="green"
					size="bite"
					type="classic"
					onClick={handleCreateRoom}
				>
					<span className="font-semibold">Create a room</span>
				</Button>
			</div>
		</>
	);
}
