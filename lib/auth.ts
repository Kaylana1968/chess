import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { cache } from "react";
import prisma from "./prisma";
import { decrypt } from "./session";

const saltRounds = 10;

export async function hashPassword(password: string) {
	const hashedPassword = await bcrypt.hash(password, saltRounds);

	return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string) {
	const isSame = await bcrypt.compare(password, hashedPassword);

	return isSame;
}

export const getSession = cache(async () => {
	const cookieStore = await cookies();
	const cookie = cookieStore.get("session")?.value;
	const session = await decrypt(cookie);

	if (!session) return null;

	const user = await prisma.user.findUnique({
		where: { id: session.userId as number }
	});

	return user;
});
