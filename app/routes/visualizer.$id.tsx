import type { Route } from "./+types/visualizer.$id";

export default function Visualizer({ params }: Route.ComponentProps) {
  return (
    <div>
      <h1>Hello</h1>
      <p>ID: {params.id}</p>
    </div>
  );
}
