"use server";

import { verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { FormState, FormStatus } from "@/types/form";

export async function loginUser(prevState: FormState, formData: FormData) {
	const username = formData.get("username")?.toString();
	const password = formData.get("password")?.toString();

	if (!username || !password) {
		return {
			message: "Please enter both username and password",
			status: "error" as FormStatus
		};
	}

	const user = await prisma.user.findUnique({
		where: { username }
	});

	if (!user) {
		return {
			message: "Invalid credentials",
			status: "error" as FormStatus
		};
	}

	const isValid = await verifyPassword(password, user.password);

	if (!isValid) {
		return {
			message: "Invalid credentials",
			status: "error" as FormStatus
		};
	}

	await createSession(user.id);

	return {
		message: "You are now connected",
		status: "success" as FormStatus
	};
}
