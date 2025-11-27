import { BoardHighlight, Coordinates, HighlightColor } from "@/types/board";
import { useEffect, useMemo, useRef, useState } from "react";
import { useHighlightContext } from "./HighlightContext";

const colors: HighlightColor[] = ["green", "red", "blue", "yellow"];
const hexaColors = {
	green: "#15781B",
	red: "#882020",
	blue: "#003088",
	yellow: "#e68f00"
} as const;

const circleStrokeWidthRatio = 0.06;
const circleMovingShrinkRatio = 0.3;

const arrowStrokeWidthRatio = 0.15;
const arrowMovingShrinkRatio = 0.1;

export default function HighlightDisplay() {
	const { highlights, currentHighlight } = useHighlightContext();
	const [boardSize, setBoardSize] = useState(0);

	const displayedHighlights = useMemo(() => {
		if (!currentHighlight?.to) return highlights;

		const displayedHighlights = [...highlights];

		const existingHighlightIndex = displayedHighlights.findIndex(
			highlight =>
				highlight.from.colIndex === currentHighlight.from.colIndex &&
				highlight.from.rowIndex === currentHighlight.from.rowIndex &&
				highlight.to.colIndex === currentHighlight.to!.colIndex &&
				highlight.to.rowIndex === currentHighlight.to!.rowIndex &&
				highlight.color === currentHighlight.color
		);

		if (existingHighlightIndex !== -1) {
			displayedHighlights[existingHighlightIndex] = {
				...displayedHighlights[existingHighlightIndex],
				isFading: true
			};

			return displayedHighlights;
		}

		displayedHighlights.push({
			...(currentHighlight as BoardHighlight),
			isMoving: true
		});

		return displayedHighlights;
	}, [highlights, currentHighlight]);

	const ref = useRef<SVGSVGElement>(null);

	useEffect(() => {
		if (ref.current) {
			const rect = ref.current.getBoundingClientRect();

			setBoardSize(rect.width);
		}
	}, []);

	const squareSize = boardSize / 8;
	const arrowHeadSize = squareSize / 25;

	function toPixel(coord: Coordinates) {
		const px = coord.colIndex * squareSize + squareSize / 2;
		const py = coord.rowIndex * squareSize + squareSize / 2;

		return { px, py };
	}

	function getSVGElement(highlight: BoardHighlight) {
		const { px: startX, py: startY } = toPixel(highlight.from);
		const { px: endX, py: endY } = toPixel(highlight.to);

		if (
			highlight.from.colIndex === highlight.to.colIndex &&
			highlight.from.rowIndex === highlight.to.rowIndex
		) {
			const strokeWidth = squareSize * circleStrokeWidthRatio;

			return (
				<circle
					cx={startX}
					cy={startY}
					r={(squareSize - strokeWidth) * 0.5}
					fill="none"
					stroke={hexaColors[highlight.color]}
					strokeWidth={
						highlight.isMoving
							? strokeWidth * (1 - circleMovingShrinkRatio)
							: strokeWidth
					}
					className={highlight.isFading ? "opacity-60" : ""}
				/>
			);
		}

		const angle = Math.atan2(endY - startY, endX - startX);
		const normalizedX = Math.cos(angle);
		const normalizedY = Math.sin(angle);

		const arrowLength = (squareSize * arrowStrokeWidthRatio) / Math.sqrt(2);

		const pathD = `M ${startX} ${startY} L ${endX - normalizedX * arrowLength} ${endY - normalizedY * arrowLength}`;
		const strokeWidth = squareSize * arrowStrokeWidthRatio;
		const arrowheadId = `arrowhead-${highlight.color}`;

		return (
			<path
				d={pathD}
				fill="none"
				stroke={hexaColors[highlight.color]}
				strokeWidth={
					highlight.isMoving
						? strokeWidth * (1 - arrowMovingShrinkRatio)
						: strokeWidth
				}
				strokeLinecap="round"
				markerEnd={`url(#${arrowheadId})`}
				className={highlight.isFading ? "opacity-60" : ""}
			/>
		);
	}

	return (
		<svg
			ref={ref}
			className="pointer-events-none absolute z-10 size-full opacity-60"
			viewBox={`0 0 ${boardSize} ${boardSize}`}
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				{colors.map(color => (
					<marker
						key={color}
						id={`arrowhead-${color}`}
						viewBox={`0 0 ${arrowHeadSize * 2} ${arrowHeadSize * 2}`}
						refX={arrowHeadSize}
						refY={arrowHeadSize}
						markerWidth={arrowHeadSize}
						markerHeight={arrowHeadSize}
						orient="auto"
					>
						<path
							d={`M 0 0 L ${arrowHeadSize * Math.sqrt(2)} ${arrowHeadSize} L 0 ${arrowHeadSize * 2} z`}
							fill={hexaColors[color]}
						/>
					</marker>
				))}
			</defs>

			{displayedHighlights.map((highlight, index) => (
				<g key={index}>{getSVGElement(highlight)}</g>
			))}
		</svg>
	);
}
