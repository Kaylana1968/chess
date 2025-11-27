import { BoardHighlight, MovingBoardHighlight } from "@/types/board";
import { createContext, useContext } from "react";

export const HighlightContext = createContext<{
	highlights: BoardHighlight[];
	setHighlights: React.Dispatch<React.SetStateAction<BoardHighlight[]>>;
	currentHighlight: MovingBoardHighlight | null;
	setCurrentHighlight: React.Dispatch<
		React.SetStateAction<MovingBoardHighlight | null>
	>;
} | null>(null);

export function useHighlightContext() {
	const ctx = useContext(HighlightContext);

	if (!ctx) throw Error("The context must be used in a provider ");

	return ctx;
}
