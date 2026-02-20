import { redirect } from "next/navigation";
import type React from "react";
import { getServerSession } from "@/lib/serverSession";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await getServerSession();
	if (!session?.session) {
		redirect("/login");
	}

	return <>{children}</>;
};

export default DashboardLayout;
