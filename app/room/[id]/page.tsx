"use client";

import { useEffect, useRef, useState } from "react";

// Déclaration du type pour les messages entrants
type Message = {
	type: "countUpdate";
	payload: number;
};

// Le composant Room (Compteur partagé)
export default function Room() {
	const [count, setCount] = useState(0);
	const [isConnected, setIsConnected] = useState(false);
	// Utiliser useRef pour stocker l'instance WebSocket
	const ws = useRef<WebSocket | null>(null);

	useEffect(() => {
		// Crée une nouvelle connexion WebSocket
		// Note: Le protocole est 'ws' au lieu de 'http'
		ws.current = new WebSocket("ws://localhost:3001");

		// 1. Gérer la connexion réussie
		ws.current.onopen = () => {
			setIsConnected(true);
			console.log("Client connecté au serveur WebSocket");
		};

		// 2. Gérer les messages entrants
		ws.current.onmessage = event => {
			try {
				// Le message est une chaîne, nous devons la parser en JSON
				const message: Message = JSON.parse(event.data);

				if (message.type === "countUpdate") {
					console.log(`Mise à jour reçue du serveur: ${message.payload}`);
					setCount(message.payload); // Met à jour l'état React
				}
			} catch (error) {
				console.error("Erreur de parsing du message WebSocket:", error);
			}
		};

		// 3. Gérer la déconnexion et les erreurs
		ws.current.onclose = () => {
			setIsConnected(false);
			console.log("Client déconnecté du serveur WebSocket");
		};

		ws.current.onerror = error => {
			console.error("Erreur WebSocket:", error);
		};

		// Fonction de nettoyage
		return () => {
			if (ws.current) {
				ws.current.close();
			}
		};
	}, []);

	// Fonction pour envoyer la demande d'incrémentation au serveur
	const handleIncrement = () => {
		if (isConnected && ws.current) {
			const messageToSend = JSON.stringify({
				type: "incrementCount", // Nommer l'action
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
