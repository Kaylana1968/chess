"use server";

import { hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FormState, FormStatus } from "@/types/form";

export async function createUser(prevState: FormState, formData: FormData) {
	const username = formData.get("username")?.toString();
	const password = formData.get("password")?.toString();
	const confirmPassword = formData.get("confirmPassword")?.toString();

	if (!username || !password)
		return {
			message: "Username and password can't be null",
			status: "error" as FormStatus
		};

	if (confirmPassword !== password)
		return {
			message: "The password and its confirmation don't match",
			status: "error" as FormStatus
		};

	try {
		const hashedPassword = await hashPassword(password);

		await prisma.user.create({
			data: { username, password: hashedPassword }
		});
	} catch {
		return {
			message: "Database Error: Failed to create user.",
			status: "error" as FormStatus
		};
	}

	return {
		message: "User created successfully",
		status: "success" as FormStatus
	};
}
