"use client";

import { Bell, Plus, RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { useCounter } from "../hooks/useCounter";

export function StarterDemo() {
  const { count, increment, reset } = useCounter();

  return (
    <div className="demo-panel">
      <div className="counter-group">
        <span
          className="counter-value"
          role="status"
          aria-label="Valeur du compteur"
        >
          {count}
        </span>
        <motion.button
          type="button"
          className="button button-dark"
          onClick={increment}
          whileTap={{ scale: 0.97 }}
        >
          <Plus size={16} aria-hidden="true" /> Incrémenter
        </motion.button>
        <button
          type="button"
          className="icon-button"
          onClick={reset}
          aria-label="Remettre le compteur à zéro"
          disabled={count === 0}
        >
          <RotateCcw size={17} aria-hidden="true" />
        </button>
      </div>
      <button
        type="button"
        className="button button-outline"
        onClick={() =>
          toast.success("Tout est prêt. À vous de créer !", {
            id: "starter-ready",
          })
        }
      >
        <Bell size={16} aria-hidden="true" /> Tester une notification
      </button>
    </div>
  );
}
