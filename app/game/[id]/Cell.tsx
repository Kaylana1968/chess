export default function Cell({
	children,
	isEven,
	isHighlighted,
	toggleHighlight
}: {
	children: React.ReactNode;
	isEven: boolean;
	isHighlighted: boolean;
	toggleHighlight: () => void;
}) {
	return (
		<div
			className={`relative flex items-center justify-center ${isEven ? "bg-yellow-100" : "bg-orange-300/70"}`}
			onMouseDown={e => e.button === 2 && toggleHighlight()}
			onContextMenu={e => e.preventDefault()}
		>
			{isHighlighted && (
				<div className="absolute top-0 left-0 size-full rounded-full border-6 border-green-700" />
			)}
			{children}
		</div>
	);
}
