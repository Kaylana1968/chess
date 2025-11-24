import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST() {
	try {
		const newRoom = await prisma.room.create({
			data: {},
			select: {
				id: true
			}
		});

		return NextResponse.json(newRoom, { status: 201 });
	} catch (error) {
		console.error("Error during room creation in API:", error);

		return NextResponse.json(
			{ error: "Internal Server Error during room creation" },
			{ status: 500 }
		);
	}
}
