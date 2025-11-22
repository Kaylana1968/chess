"use client";

import { useState } from "react";
import { createUser } from "./action";

type FormData = {
	username: string;
	password: string;
};

const initialFormData = {
	username: "",
	password: ""
};

export default function RegisterForm() {
	const [formData, setFormData] = useState<FormData>(initialFormData);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;

		setFormData(prevData => ({
			...prevData,
			[name]: value
		}));
	}

	return (
		<form
			className="flex w-120 flex-col gap-2 rounded border bg-indigo-200 p-4"
			onSubmit={e => {
				e.preventDefault();

				createUser(formData);
			}}
		>
			<input
				type="text"
				placeholder="Username"
				name="username"
				value={formData.username}
				onChange={handleChange}
				className="rounded border"
			/>

			<input
				type="password"
				placeholder="Password"
				name="password"
				value={formData.password}
				onChange={handleChange}
				className="rounded border"
			/>

			<button type="submit" className="w-min rounded border px-2 py-1">
				Register
			</button>
		</form>
	);
}
