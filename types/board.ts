export type Coordinates = {
	rowIndex: number;
	colIndex: number;
};

export type HighlightColor = "green" | "red" | "blue" | "yellow";

export type BoardHighlight = {
	from: Coordinates;
	to: Coordinates;
	color: HighlightColor;
	isFading?: boolean;
	isMoving?: boolean;
};

export type MovingBoardHighlight = {
	from: Coordinates;
	to: Coordinates | null;
	color: HighlightColor;
};
