import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getSession } from "@/server/better-auth/server";

export default function Home() {
  return (
    <>
      <Container>
        <div className="flex py-4 flex-col  gap-4 h-96 justify-center">
          <div className="max-w-2xl space-y-4">
            <h1 className="font-extrabold text-4xl md:text-5xl">
              Insights and tutorials for modern developers
            </h1>
            <p className="text-muted-foreground max-w-md">
              Practical guides on web development, system design, and software
              engineering.
            </p>

            <div className="space-x-4">
              <Button>Get Started</Button>
              <Button variant={"secondary"}>Read Articles</Button>
            </div>
          </div>
        </div>
      </Container>
      <Separator />
    </>
  );
}
