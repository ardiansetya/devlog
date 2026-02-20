import { redirect } from "next/navigation";
import { RegisterForm } from "@/components/RegisterForm";
import { getServerSession } from "@/lib/serverSession";

export default async function RegisterPage() {
	const session = await getServerSession();
	if (session?.session) {
		redirect("/");
  } 
	return (
		<div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
			<div className="w-full max-w-sm md:max-w-4xl">
				<RegisterForm />
			</div>
		</div>
	);
}
