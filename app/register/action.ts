"use server";

import { hashPassword } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { FormState, FormStatus } from "@/types/form";

export async function createUser(prevState: FormState, formData: FormData) {
	const username = formData.get("username")?.toString();
	const password = formData.get("password")?.toString();
	const confirmPassword = formData.get("confirmPassword")?.toString();

	if (!username || !password) {
		return {
			message: "Please enter both username and password",
			status: "error" as FormStatus
		};
	}

	if (confirmPassword !== password) {
		return {
			message: "The password and its confirmation don't match",
			status: "error" as FormStatus
		};
	}

	try {
		const hashedPassword = await hashPassword(password);

		const user = await prisma.user.create({
			data: { username, password: hashedPassword }
		});

		await createSession(user.id);
	} catch {
		return {
			message: "Database Error: Failed to create user.",
			status: "error" as FormStatus
		};
	}

	return {
		message: "Your account has been created and you are connected",
		status: "success" as FormStatus
	};
}
