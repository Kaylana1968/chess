"use server";

import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

const saltRounds = 10;

async function hashPassword(password: string) {
	const hashedPassword = await bcrypt.hash(password, saltRounds);

	return hashedPassword;
}

export async function createUser({
	username,
	password
}: Prisma.UserCreateInput) {
	const hashedPassword = await hashPassword(password);

	await prisma.user.create({
		data: { username, password: hashedPassword }
	});
}
