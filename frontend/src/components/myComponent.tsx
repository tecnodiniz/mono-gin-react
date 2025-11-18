import { memo } from "react";

export const MyComponent = memo(function MyComponent({
  value,
}: {
  value: number;
}) {
  console.log("Renderizou MyComponent");
  return <div>Valor: {value}</div>;
});
