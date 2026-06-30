import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";
import { Bibelvers } from "@/components/ui/Bibelvers";

describe("Button", () => {
  it("renders children as a button by default", () => {
    render(<Button>Mehr erfahren</Button>);
    const el = screen.getByRole("button", { name: "Mehr erfahren" });
    expect(el.tagName).toBe("BUTTON");
  });

  it("renders as a link when href is given", () => {
    render(<Button href="/gottesdienste">Termine</Button>);
    const el = screen.getByRole("link", { name: "Termine" });
    expect(el).toHaveAttribute("href", "/gottesdienste");
  });
});

describe("Bibelvers", () => {
  it("renders the verse and citation", () => {
    render(<Bibelvers cite="Matthäus 11,28">Kommt her zu mir alle.</Bibelvers>);
    expect(screen.getByText(/Kommt her zu mir alle\./)).toBeInTheDocument();
    expect(screen.getByText(/Matthäus 11,28/)).toBeInTheDocument();
  });
});
