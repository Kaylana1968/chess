import { Field, Input, Label } from "@headlessui/react";

export default function InputField({
	label,
	...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
	return (
		<Field className="flex flex-col">
			<Label className="after:ml-1 after:content-[':']">{label}</Label>
			<Input
				className="rounded border border-neutral-600 px-2 py-0.5 transition-colors duration-100 data-focus:border-neutral-500 data-focus:outline-none data-hover:border-neutral-500"
				{...props}
			/>
		</Field>
	);
}
