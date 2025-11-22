import Button from "@/components/buttons/button";
import ButtonWithImageAndText from "@/components/buttons/buttonWithImageAndText";
import { Link } from "lucide-react";

export default function Home() {
	return (
		<>
			<h1 className="mt-60 text-center text-5xl">Dual Chess</h1>
			<div className="mt-10 flex justify-center">
				<ButtonWithImageAndText />
			</div>
			<div className="mt-10 flex justify-center">
				<Button color="green" size="bite" type="classic">
					<Link className="mr-2" />
					<span className="font-semibold">Create a link</span>
				</Button>
			</div>
		</>
	);
}
