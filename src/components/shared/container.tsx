import React from "react";

export function Container({ children }: { children: React.ReactNode }) {
  return <section  className="container mx-auto">{children}</section>;
}
