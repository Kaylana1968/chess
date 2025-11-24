import LoginForm from "./login-form";

export default async function Login() {
	return (
		<main className="flex h-screen items-center justify-center bg-[url(/background.png)] bg-cover py-10">
			<LoginForm />
		</main>
	);
}
