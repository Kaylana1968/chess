"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Message = {
	type: "countUpdate";
	payload: number;
};

export default function Room() {
	const params = useParams();
	const roomId = params.id;

	const [count, setCount] = useState(0);
	const [isConnected, setIsConnected] = useState(false);
	const ws = useRef<WebSocket | null>(null);

	useEffect(() => {
		if (!roomId) return;

		ws.current = new WebSocket("ws://localhost:3001");

		ws.current.onopen = () => {
			setIsConnected(true);
			console.log("Client connecté au serveur WebSocket");

			const joinMessage = JSON.stringify({
				type: "joinRoom",
				payload: { roomId: roomId }
			});
			ws.current!.send(joinMessage);
		};

		ws.current.onmessage = event => {
			try {
				const message: Message = JSON.parse(event.data);

				if (message.type === "countUpdate") {
					console.log(`Mise à jour reçue du serveur: ${message.payload}`);
					setCount(message.payload);
				}
			} catch (error) {
				console.error("Erreur de parsing du message WebSocket:", error);
			}
		};

		ws.current.onclose = () => {
			setIsConnected(false);
			console.log("Client déconnecté du serveur WebSocket");
		};

		ws.current.onerror = error => {
			console.error("Erreur WebSocket:", error);
		};

		return () => {
			if (ws.current) {
				ws.current.close();
			}
		};
	}, [roomId]);

	const handleIncrement = () => {
		if (isConnected && ws.current) {
			const messageToSend = JSON.stringify({
				type: "incrementCount",
				payload: null
			});

			ws.current.send(messageToSend);
		} else {
			console.error("Non connecté au serveur WebSocket.");
		}
	};

	return (
		<div
			style={{
				padding: 50,
				textAlign: "center",
				fontFamily: "Arial, sans-serif"
			}}
		>
			<p>Statut : {isConnected ? "Connected" : "Disconnected"}</p>
			<hr />
			<h2>
				Compteur :{" "}
				<strong style={{ fontSize: "3em", color: "#0070f3" }}>{count}</strong>
			</h2>
			<button
				onClick={handleIncrement}
				disabled={!isConnected}
				style={{
					padding: "15px 30px",
					fontSize: "20px",
					cursor: "pointer",
					marginTop: "20px",
					backgroundColor: isConnected ? "#0070f3" : "#ccc",
					color: "white",
					border: "none",
					borderRadius: "8px"
				}}
			>
				Incrémenter
			</button>
		</div>
	);
}
