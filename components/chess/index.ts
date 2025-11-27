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

const pieceComponent = {
	WR: WhiteRook,
	WN: WhiteKnight,
	WB: WhiteBishop,
	WK: WhiteKing,
	WQ: WhiteQueen,
	WP: WhitePawn,
	BR: BlackRook,
	BN: BlackKnight,
	BB: BlackBishop,
	BK: BlackKing,
	BQ: BlackQueen,
	BP: BlackPawn
} as const;

export default pieceComponent;
