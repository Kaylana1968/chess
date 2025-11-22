import RegisterForm from "./register-form";

export default function Register() {
	return (
		<>
			<h1 className="text-center text-4xl font-semibold">Register</h1>

			<div className="mt-10 flex justify-center">
				<RegisterForm />
			</div>
		</>
	);
}
