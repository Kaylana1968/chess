export type FormStatus = "success" | "error" | "idle";

export type FormState = {
	message: string;
	status: FormStatus;
};
