"use client";

import { FormStatus } from "@/types/form";
import { Button, Field, Input, Label } from "@headlessui/react";
import { useActionState } from "react";
import { createUser } from "./action";

const initialState = {
	message: "",
	status: "idle" as FormStatus
};

const inputClassName =
	"rounded border border-neutral-600 px-2 py-0.5 transition-colors duration-100 data-focus:border-neutral-500 data-focus:outline-none data-hover:border-neutral-500";

export default function RegisterForm() {
	const [state, formAction, isPending] = useActionState(
		createUser,
		initialState
	);

	return (
		<form
			className="flex w-120 flex-col gap-2 rounded border border-neutral-600 bg-neutral-800 p-4 text-white"
			action={formAction}
		>
			<h1 className="text-center text-4xl font-semibold">Register</h1>

			<Field className="flex flex-col">
				<Label className="after:ml-1 after:content-[':']">Username</Label>
				<Input type="text" name="username" className={inputClassName} />
			</Field>

			<Field className="flex flex-col">
				<Label className="after:ml-1 after:content-[':']">Password</Label>
				<Input type="password" name="password" className={inputClassName} />
			</Field>

			<Field className="flex flex-col">
				<Label className="after:ml-1 after:content-[':']">
					Confirm password
				</Label>
				<Input
					type="password"
					name="confirmPassword"
					className={inputClassName}
				/>
			</Field>

			<div className="mt-4 flex items-end gap-2">
				<Button
					type="submit"
					className="rounded border border-neutral-600 px-2 py-1 disabled:cursor-not-allowed data-hover:border-neutral-500 data-hover:data-active:opacity-50"
					disabled={isPending}
				>
					Register
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
