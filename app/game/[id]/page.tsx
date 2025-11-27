"use client";
import pieceComponent from "@/components/chess";
import {
	BoardHighlight,
	Coordinates,
	MovingBoardHighlight
} from "@/types/board";
import { useState } from "react";
import Cell from "./Cell";
import { HighlightContext } from "./HighlightContext";
import HighlightDisplay from "./HightlightDisplay";

const initialBoard = [
	["BR", "BN", "BB", "BQ", "BK", "BB", "BN", "BR"],
	["BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP"],
	["", "", "", "", "", "", "", ""],
	["", "", "", "", "", "", "", ""],
	["", "", "", "", "", "", "", ""],
	["", "", "", "", "", "", "", ""],
	["WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP"],
	["WR", "WN", "WB", "WQ", "WK", "WB", "WN", "WR"]
] as (keyof typeof pieceComponent | "")[][];

function getIconFromCell(cell: keyof typeof pieceComponent | "") {
	if (!cell) return;

	const Comp = pieceComponent[cell];

	return <Comp size={90} />;
}

export default function Game() {
	const [board, setBoard] = useState(initialBoard);
	const [highlights, setHighlights] = useState<BoardHighlight[]>([]);
	const [currentHighlight, setCurrentHighlight] =
		useState<MovingBoardHighlight | null>(null);

	function resetCurrentHighlight() {
		setCurrentHighlight(null);

		document.removeEventListener("mouseup", resetCurrentHighlight);
	}

	function handleMouseDown(e: React.MouseEvent) {
		if (e.button === 2) {
			document.addEventListener("mouseup", resetCurrentHighlight);
		}
	}

	function handleMouseOut() {
		setCurrentHighlight(prev => (prev ? { ...prev, to: null } : null));
	}

	function handleMouseUp() {
		if (currentHighlight?.to) {
			setHighlights(prev => {
				const newHighlights = [...prev];

				const existingHighlightIndex = newHighlights.findIndex(
					highlight =>
						highlight.from.colIndex === currentHighlight.from.colIndex &&
						highlight.from.rowIndex === currentHighlight.from.rowIndex &&
						highlight.to.colIndex === currentHighlight.to!.colIndex &&
						highlight.to.rowIndex === currentHighlight.to!.rowIndex
				);

				const removedHighlight =
					existingHighlightIndex !== -1
						? newHighlights.splice(existingHighlightIndex, 1)
						: null;

				if (
					removedHighlight?.[0] &&
					removedHighlight[0].color === currentHighlight.color
				)
					return newHighlights;

				newHighlights.push(currentHighlight as BoardHighlight);

				return newHighlights;
			});
		}
	}

	return (
		<HighlightContext.Provider
			value={{
				highlights,
				setHighlights,
				currentHighlight,
				setCurrentHighlight
			}}
		>
			<div
				className="relative grid h-dvh w-dvh grid-cols-8 grid-rows-8"
				onClick={() => setHighlights([])}
				onMouseDown={handleMouseDown}
				onMouseOut={handleMouseOut}
				onMouseUp={handleMouseUp}
			>
				<HighlightDisplay />
				{board.map((row, rowIndex) =>
					row.map((cell, colIndex) => (
						<Cell
							key={`${rowIndex}-${colIndex}`}
							rowIndex={rowIndex}
							colIndex={colIndex}
						>
							{getIconFromCell(cell)}
						</Cell>
					))
				)}
			</div>
		</HighlightContext.Provider>
	);
}
