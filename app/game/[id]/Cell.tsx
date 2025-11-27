import { HighlightColor } from "@/types/board";
import { useHighlightContext } from "./HighlightContext";

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

	return (
		<div
			className={`relative flex items-center justify-center ${(rowIndex + colIndex) % 2 === 0 ? "bg-yellow-100" : "bg-orange-300/70"}`}
			onMouseDown={handleMouseDown}
			onMouseOver={handleMouseOver}
			onContextMenu={e => e.preventDefault()}
		>
			{/* {isHighlighted && (
				<div className="absolute top-0 left-0 size-full rounded-full border-6 border-green-700" />
			)} */}
			{children}
		</div>
	);
}
