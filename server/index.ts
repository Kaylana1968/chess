import { WebSocket, WebSocketServer } from "ws";

const PORT = 3001;

const roomCounts = new Map<string, number>();

type ClientWebSocket = WebSocket & {
	roomId?: string;
};
const wss = new WebSocketServer({ port: PORT });

type JoinMessage = {
	type: "joinRoom";
	payload: {
		roomId: string;
	};
};

type IncrementMessage = {
	type: "incrementCount";
	payload: unknown;
};

type ClientMessage = JoinMessage | IncrementMessage;

console.log(`WebSocket Server starting on port ${PORT}...`);

const broadcastCount = (roomId: string, newCount: number) => {
	const message = JSON.stringify({
		type: "countUpdate",
		payload: newCount
	});

	wss.clients.forEach(client => {
		const roomClient = client as ClientWebSocket;

		if (
			roomClient.readyState === WebSocket.OPEN &&
			roomClient.roomId === roomId
		) {
			roomClient.send(message);
		}
	});
};

wss.on("connection", (ws: WebSocket) => {
	const client = ws as ClientWebSocket;

	console.log(`Client connecté (total: ${wss.clients.size})`);

	client.on("message", data => {
		try {
			const message: ClientMessage = JSON.parse(data.toString());

			if (message.type === "joinRoom") {
				const { roomId } = message.payload;

				client.roomId = roomId;

				if (!roomCounts.has(roomId)) {
					roomCounts.set(roomId, 0);
					console.log(`Nouvelle salle créée: ${roomId}`);
				}

				const currentCount = roomCounts.get(roomId)!;

				console.log(
					`Client a rejoint la salle ${roomId}. Compteur: ${currentCount}`
				);

				client.send(
					JSON.stringify({
						type: "countUpdate",
						payload: currentCount
					})
				);
			} else if (message.type === "incrementCount") {
				const roomId = client.roomId;

				if (!roomId) {
					console.error("Erreur: Le client n'a pas encore rejoint de salle.");
					return;
				}

				let currentCount = roomCounts.get(roomId)!;
				currentCount++;
				roomCounts.set(roomId, currentCount);

				console.log(`Salle ${roomId} incrémentée à: ${currentCount}`);

				broadcastCount(roomId, currentCount);
			}
		} catch (error) {
			console.error("Erreur de traitement du message:", error);
		}
	});

	ws.on("close", () => {
		console.log(`Client déconnecté (restant: ${wss.clients.size})`);
	});
});

console.log(`WebSocket Server running and listening on port ${PORT}`);
