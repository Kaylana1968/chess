"use client";

import InputField from "@/components/input-field";
import { FormStatus } from "@/types/form";
import { Button } from "@headlessui/react";
import { useActionState } from "react";
import { loginUser } from "./action";

const initialState = {
	message: "",
	status: "idle" as FormStatus
};

export default function LoginForm() {
	const [state, formAction, isPending] = useActionState(
		loginUser,
		initialState
	);

	return (
		<form
			className="flex w-120 flex-col gap-2 rounded border border-neutral-600 bg-neutral-800 p-4 text-white"
			action={formAction}
		>
			<h1 className="text-center text-4xl font-semibold">Login</h1>

			<InputField label="Username" type="text" name="username" />
			<InputField label="Password" type="password" name="password" />

			<div className="mt-4 flex items-end gap-2">
				<Button
					type="submit"
					className="rounded border border-neutral-600 px-2 py-1 disabled:cursor-not-allowed data-hover:border-neutral-500 data-hover:data-active:opacity-50"
					disabled={isPending}
				>
					Login
				</Button>

				{state.status !== "idle" && (
					<span
						className={`${state.status === "error" ? "text-red-500" : "text-green-500"}`}
					>
						{state.message}
					</span>
				)}
			</div>
		</form>
	);
}
