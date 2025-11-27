import { HighlightColor } from "@/types/board";
import { useHighlightContext } from "./HighlightContext";
import { isWhite } from "./page";

const rowNumbers = ["1", "2", "3", "4", "5", "6", "7", "8"];
const colLetters = ["a", "b", "c", "d", "e", "f", "g", "h"];

function getColorFromEvent(e: React.MouseEvent): HighlightColor {
	return e.ctrlKey && e.altKey
		? "orange"
		: e.ctrlKey
			? "red"
			: e.altKey
				? "blue"
				: "green";
}

export default function Cell({
	children,
	rowIndex,
	colIndex
}: {
	children: React.ReactNode;
	rowIndex: number;
	colIndex: number;
}) {
	const { setCurrentHighlight } = useHighlightContext();

	function handleMouseDown(e: React.MouseEvent) {
		if (e.button === 2) {
			setCurrentHighlight({
				from: { rowIndex, colIndex },
				to: { rowIndex, colIndex },
				color: getColorFromEvent(e)
			});
		}
	}

	function handleMouseOver() {
		setCurrentHighlight(prev =>
			prev ? { ...prev, to: { rowIndex, colIndex } } : null
		);
	}

	const isEven = (rowIndex + colIndex) % 2 === 0;

	return (
		<div
			className={`relative flex items-center justify-center ${isEven ? "bg-orange-100/90" : "bg-orange-300/70"}`}
			onMouseDown={handleMouseDown}
			onMouseOver={handleMouseOver}
			onContextMenu={e => e.preventDefault()}
		>
			{colIndex === 0 && (
				<span
					className={`absolute top-1 left-1 text-lg/[1rem] font-bold ${isEven ? "text-orange-800/70" : "text-orange-100/90"}`}
				>
					{isWhite
						? rowNumbers[rowNumbers.length - rowIndex - 1]
						: rowNumbers[rowIndex]}
				</span>
			)}
			{rowIndex === rowNumbers.length - 1 && (
				<span
					className={`absolute right-1 bottom-1 text-lg/[1rem] font-bold ${isEven ? "text-orange-800/70" : "text-orange-100/90"}`}
				>
					{isWhite
						? colLetters[colIndex]
						: colLetters[colLetters.length - colIndex - 1]}
				</span>
			)}
			{children}
		</div>
	);
}
