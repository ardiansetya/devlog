"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { authClient } from "@/server/better-auth/client";
import { Spinner } from "./ui/spinner";

export const loginSchema = z.object({
	email: z.email(),
	password: z.string().min(8),
});

export type LoginSchema = z.infer<typeof loginSchema>;

type SocialProvider = "github" | "google";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [isPassword, setIsPassword] = useState(true);
	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (data: LoginSchema) => {
		console.log(data);
		authClient.signIn.email(
			{
				email: data.email,
				password: data.password,
				callbackURL: "/dashboard",
				rememberMe: false,
			},
			{
				onSuccess: () => {
					toast.success("Logged in successfully");
					form.reset();
				},
				onError: (error) => {
					toast.error(error.error.message);
				},
				onLoading: () => {
					toast.loading("Logging in...");
				},
			},
		);
	};

	const handleLogin = (provider: SocialProvider) => {
		authClient.signIn.social({ provider });
	};
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card className="overflow-hidden p-0">
				<CardContent className="grid p-0 md:grid-cols-2">
					<form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
						<FieldGroup>
							<div className="flex flex-col items-center gap-2 text-center">
								<h1 className="font-bold text-2xl">Welcome back</h1>
								<p className="text-balance text-muted-foreground">
									Login to your Devlog account
								</p>
							</div>
							<Controller
								control={form.control}
								name="email"
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor={field.name}>Email</FieldLabel>
										<Input
											{...field}
											aria-invalid={fieldState.invalid}
											id={field.name}
											placeholder="Enter your email"
											type="email"
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
							<Controller
								control={form.control}
								name="password"
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor={field.name}>Password</FieldLabel>
										<div className="relative">
											<Input
												{...field}
												aria-invalid={fieldState.invalid}
												className="relative"
												id={field.name}
												placeholder="Enter your password"
												type={isPassword ? "password" : "text"}
											/>
											{isPassword ? (
												<EyeClosedIcon
													className="absolute top-2 right-2 cursor-pointer"
													onClick={() => setIsPassword(!isPassword)}
												/>
											) : (
												<EyeIcon
													className="absolute top-2 right-2 cursor-pointer"
													onClick={() => setIsPassword(!isPassword)}
												/>
											)}
										</div>

										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
							<Field>
								<Button type="submit">
									{form.formState.isSubmitting ? <Spinner /> : "Login"}
								</Button>
							</Field>
							<FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
								Or continue with
							</FieldSeparator>
							<Field className="grid grid-cols-2 gap-4">
								<Button
									onClick={() => handleLogin("github")}
									type="button"
									variant="outline"
								>
									<svg
										fill="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577
											c0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.756-1.333-1.756
											-1.09-.745.082-.729.082-.729 1.205.084 1.838 1.236 1.838 1.236
											1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605
											-2.665-.3-5.466-1.332-5.466-5.93
											0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176
											0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404
											1.02.005 2.047.138 3.006.404
											2.291-1.552 3.297-1.23 3.297-1.23
											.653 1.653.241 2.873.118 3.176.77.84 1.233 1.91 1.233 3.22
											0 4.61-2.807 5.625-5.479 5.92
											.43.372.823 1.102.823 2.222
											0 1.606-.015 2.898-.015 3.293
											0 .322.216.694.825.576C20.565 21.796 24 17.298 24 12
											24 5.373 18.627 0 12 0z"
										/>
									</svg>
									<span className="sr-only">Login with Github</span>
								</Button>
								<Button
									onClick={() => handleLogin("google")}
									type="button"
									variant="outline"
								>
									<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
											fill="currentColor"
										/>
									</svg>
									<span className="sr-only">Login with Google</span>
								</Button>
							</Field>
							<FieldDescription className="text-center">
								Don&apos;t have an account?{" "}
								<Link href="/register">Sign up</Link>
							</FieldDescription>
						</FieldGroup>
					</form>
					<div className="relative hidden bg-muted md:block">
						<Image
							alt="Image"
							className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
							height={500}
							src="https://images.unsplash.com/photo-1560215978-9054e9c7b983"
							width={400}
						/>
					</div>
				</CardContent>
			</Card>
			<FieldDescription className="px-6 text-center">
				By clicking continue, you agree to our{" "}
				<Link href="#">Terms of Service</Link> and{" "}
				<Link href="#">Privacy Policy</Link>.
			</FieldDescription>
		</div>
	);
}
