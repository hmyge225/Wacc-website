import { expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorPage from "@/app/error";
import NotFound from "@/app/not-found";
import Loading from "@/app/loading";

it("réessaie avec l’API retry de Next.js sans exposer l’erreur", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  const retry = vi.fn();
  const user = userEvent.setup();
  render(<ErrorPage error={new Error("Information interne")} retry={retry} />);
  expect(screen.queryByText("Information interne")).not.toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Réessayer" }));
  expect(retry).toHaveBeenCalledOnce();
});

it("propose un retour à l’accueil depuis la page introuvable", () => {
  render(<NotFound />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Cette page reste à créer.",
  );
  expect(
    screen.getByRole("link", { name: "Retour à l’accueil" }),
  ).toHaveAttribute("href", "/");
});

it("annonce le chargement aux technologies d’assistance", () => {
  render(<Loading />);
  expect(screen.getByRole("status")).toHaveTextContent(
    "Chargement de la page…",
  );
});
