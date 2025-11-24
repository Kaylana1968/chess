import { WebSocket, WebSocketServer } from "ws";

const PORT = 3001;

// État du jeu (le "compteur")
let currentCount: number = 0;

// Créer le serveur WebSocket
const wss = new WebSocketServer({ port: PORT });

// Déclaration du type pour les messages entrants
type ClientMessage = {
	type: "incrementCount";
	payload: unknown;
};

console.log(`WebSocket Server starting on port ${PORT}...`);

// 💡 Fonction utilitaire pour diffuser le nouvel état à TOUS les clients
const broadcastCount = (newCount: number) => {
	// 1. Créer le message JSON à envoyer
	const message = JSON.stringify({
		type: "countUpdate",
		payload: newCount
	});

	// 2. Parcourir tous les clients connectés et l'envoyer
	wss.clients.forEach(client => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(message);
		}
	});
};

wss.on("connection", (ws: WebSocket) => {
	// La propriété 'id' n'existe pas nativement, on utiliserait un Map ou on l'ajouterait si besoin
	console.log(`Client connecté (total: ${wss.clients.size})`);

	// 1. Envoyer la valeur actuelle lors de la connexion
	broadcastCount(currentCount); // Utiliser broadcast pour envoyer à ce client (et tous les autres)

	// 2. Gérer les messages entrants
	ws.on("message", data => {
		try {
			// Le message est un Buffer, le convertir en string puis le parser
			const message: ClientMessage = JSON.parse(data.toString());

			if (message.type === "incrementCount") {
				currentCount++;
				console.log(`Compteur incrémenté à: ${currentCount}`);

				// 3. Diffuser la nouvelle valeur à TOUS
				broadcastCount(currentCount);
			}
		} catch (error) {
			console.error("Erreur de traitement du message:", error);
		}
	});

	// 4. Gérer la déconnexion
	ws.on("close", () => {
		console.log(`Client déconnecté (restant: ${wss.clients.size})`);
	});
});

console.log(`WebSocket Server running and listening on port ${PORT}`);
