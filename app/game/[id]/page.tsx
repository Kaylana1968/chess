"use client";

import BlackBishop from "@/components/chess/BlackBishop";
import BlackKing from "@/components/chess/BlackKing";
import BlackKnight from "@/components/chess/BlackKnight";
import BlackPawn from "@/components/chess/BlackPawn";
import BlackQueen from "@/components/chess/BlackQueen";
import BlackRook from "@/components/chess/BlackRook";
import WhiteBishop from "@/components/chess/WhiteBishop";
import WhiteKing from "@/components/chess/WhiteKing";
import WhiteKnight from "@/components/chess/WhiteKnight";
import WhitePawn from "@/components/chess/WhitePawn";
import WhiteQueen from "@/components/chess/WhiteQueen";
import WhiteRook from "@/components/chess/WhiteRook";
import { useState } from "react";
import Cell from "./Cell";

const initialBoard = [
	["BR", "BN", "BB", "BQ", "BK", "BB", "BN", "BR"],
	["BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP"],
	["", "", "", "", "", "", "", ""],
	["", "", "", "", "", "", "", ""],
	["", "", "", "", "", "", "", ""],
	["", "", "", "", "", "", "", ""],
	["WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP"],
	["WR", "WN", "WB", "WQ", "WK", "WB", "WN", "WR"]
];

const initialHighlightedCells = initialBoard.map(row => row.map(() => false));

function getIconFromCell(cell: string) {
	if (!cell) return;

	let Comp = undefined;

	switch (cell) {
		case "WR":
			Comp = WhiteRook;
			break;

		case "WN":
			Comp = WhiteKnight;
			break;

		case "WB":
			Comp = WhiteBishop;
			break;

		case "WK":
			Comp = WhiteKing;
			break;

		case "WQ":
			Comp = WhiteQueen;
			break;

		case "WP":
			Comp = WhitePawn;
			break;

		case "BR":
			Comp = BlackRook;
			break;

		case "BN":
			Comp = BlackKnight;
			break;

		case "BB":
			Comp = BlackBishop;
			break;

		case "BK":
			Comp = BlackKing;
			break;

		case "BQ":
			Comp = BlackQueen;
			break;

		case "BP":
			Comp = BlackPawn;
			break;

		default:
			return;
	}

	return <Comp size={90} />;
}

export default function Game() {
	const [board, setBoard] = useState(initialBoard);
	const [highlightedCells, setHighlightedCells] = useState(
		initialHighlightedCells
	);

	function toggleHighlight(rowIndex: number, colIndex: number) {
		setHighlightedCells(prev => {
			const newHighlighted = prev.map(row => [...row]);
			newHighlighted[rowIndex][colIndex] = !newHighlighted[rowIndex][colIndex];

			return newHighlighted;
		});
	}

	return (
		<div
			className="grid h-dvh w-dvh grid-cols-8 grid-rows-8"
			onClick={() => setHighlightedCells(initialHighlightedCells)}
		>
			{board.map((row, rowIndex) =>
				row.map((cell, colIndex) => (
					<Cell
						key={`${rowIndex}-${colIndex}`}
						isEven={(rowIndex + colIndex) % 2 === 0}
						isHighlighted={highlightedCells[rowIndex][colIndex]}
						toggleHighlight={() => toggleHighlight(rowIndex, colIndex)}
					>
						{getIconFromCell(cell)}
					</Cell>
				))
			)}
		</div>
	);
}
