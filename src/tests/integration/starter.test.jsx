import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AppProviders } from "@/app/providers/AppProviders";
import { getQueryClient } from "@/app/providers/query-client";
import { StarterDemo } from "@/features/home/components/StarterDemo";

afterEach(() => {
  toast.remove();
  getQueryClient().clear();
});

describe("démonstration avec les vrais providers", () => {
  it("partage le compteur entre composants et permet de le remettre à zéro", async () => {
    const user = userEvent.setup();
    render(
      <AppProviders>
        <StarterDemo />
        <StarterDemo />
      </AppProviders>,
    );
    const counters = screen.getAllByRole("status", {
      name: "Valeur du compteur",
    });
    const resetButtons = screen.getAllByRole("button", {
      name: "Remettre le compteur à zéro",
    });
    expect(resetButtons[0]).toBeDisabled();
    await user.click(screen.getAllByRole("button", { name: "Incrémenter" })[0]);
    expect(counters[0]).toHaveTextContent("1");
    expect(counters[1]).toHaveTextContent("1");
    await user.click(resetButtons[1]);
    expect(counters[0]).toHaveTextContent("0");
    expect(resetButtons[0]).toBeDisabled();
  });

  it("crée un nouveau store après démontage du provider", async () => {
    const user = userEvent.setup();
    const first = render(
      <AppProviders>
        <StarterDemo />
      </AppProviders>,
    );
    await user.click(screen.getByRole("button", { name: "Incrémenter" }));
    first.unmount();
    render(
      <AppProviders>
        <StarterDemo />
      </AppProviders>,
    );
    expect(
      screen.getByRole("status", { name: "Valeur du compteur" }),
    ).toHaveTextContent("0");
  });

  it("affiche une notification unique après un clic", async () => {
    const user = userEvent.setup();
    render(
      <AppProviders>
        <StarterDemo />
      </AppProviders>,
    );
    const button = screen.getByRole("button", {
      name: "Tester une notification",
    });
    const message = "Tout est prêt. À vous de créer !";
    expect(screen.queryByText(message)).not.toBeInTheDocument();
    await user.click(button);
    // jsdom ne mesure pas la hauteur utilisée par la transition du toast.
    expect(await screen.findByText(message)).toBeInTheDocument();
    await user.click(button);
    expect(screen.getAllByText(message)).toHaveLength(1);
  });

  it("fournit un cache Query stable aux composants client", async () => {
    const queryFn = vi.fn(async () => "Données disponibles");
    function QueryProbe() {
      const { data, isPending } = useQuery({
        queryKey: ["integration"],
        queryFn,
      });
      return <p>{isPending ? "Chargement des données…" : data}</p>;
    }
    const view = render(
      <AppProviders>
        <QueryProbe />
      </AppProviders>,
    );
    expect(await screen.findByText("Données disponibles")).toBeVisible();
    view.rerender(
      <AppProviders>
        <QueryProbe />
      </AppProviders>,
    );
    expect(queryFn).toHaveBeenCalledOnce();
  });
});
