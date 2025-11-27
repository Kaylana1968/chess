import { HighlightColor } from "@/types/board";
import { useHighlightContext } from "./HighlightContext";
import { isWhite } from "./page";

const rowNumbers = ["1", "2", "3", "4", "5", "6", "7", "8"];
const colLetters = ["a", "b", "c", "d", "e", "f", "g", "h"];

function getColorFromEvent(e: React.MouseEvent): HighlightColor {
	return e.ctrlKey && e.altKey
		? "yellow"
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
			className={`relative flex items-center justify-center ${isEven ? "bg-[#f0d9b5]" : "bg-[#b58863]"}`}
			onMouseDown={handleMouseDown}
			onMouseOver={handleMouseOver}
			onContextMenu={e => e.preventDefault()}
		>
			{colIndex === 0 && (
				<span
					className={`absolute top-1 left-1 text-lg/4 font-bold ${isEven ? "text-[#946f51]" : "text-[#f0d9b5]"}`}
				>
					{isWhite
						? rowNumbers[rowNumbers.length - rowIndex - 1]
						: rowNumbers[rowIndex]}
				</span>
			)}
			{rowIndex === rowNumbers.length - 1 && (
				<span
					className={`absolute right-1 bottom-1 text-lg/4 font-bold ${isEven ? "text-[#946f51]" : "text-[#f0d9b5]"}`}
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
