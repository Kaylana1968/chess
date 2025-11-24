import LoginForm from "./login-form";

export default async function Login() {
	return (
		<main className="h-screen bg-[url(/background.png)] bg-cover py-10">
			<div className="flex justify-center">
				<LoginForm />
			</div>
		</main>
	);
}
