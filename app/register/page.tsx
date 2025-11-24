import RegisterForm from "./register-form";

export default function Register() {
	return (
		<main className="h-screen bg-[url(/background.png)] bg-cover py-10">
			<div className="flex justify-center">
				<RegisterForm />
			</div>
		</main>
	);
}
