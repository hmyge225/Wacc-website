import axios from "axios";

// Client HTTP public : aucune session ni aucun secret dans les valeurs globales.
// Pour les lectures serveur, privilégier fetch et les mécanismes de cache Next.js.
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  timeout: 10_000,
});
