"use client";
import React from "react";

export default function Button({
	children,
	color,
	size,
	type,
	...props
}: {
	children?: React.ReactNode;
	color: "green" | "blue" | "red" | "white" | "black";
	size?: string;
	type: "classic" | "roundround";
} & React.HTMLAttributes<HTMLButtonElement>) {
	const colors = {
		green: "bg-green-600 hover:bg-green-700",
		blue: "bg-blue-600 hover:bg-blue-700",
		red: "bg-red-600 hover:bg-red-700",
		white: "bg-white hover:bg-gray-300 text-gray-800",
		black: "bg-black hover:bg-gray-900 "
	};

	const types = {
		classic: "flex cursor-pointer items-center rounded-md px-4 py-2",
		roundround: ""
	};

	return (
		<button className={`${colors[color]} ${types[type]}`} {...props}>
			{children}
		</button>
	);
}
