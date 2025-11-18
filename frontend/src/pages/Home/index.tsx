import { MyComponent } from "../../components/myComponent";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  return (
    <>
      {other}
      <MyComponent value={count} />
      <button onClick={() => setCount((c) => c + 1)}>Clique</button>
      <button onClick={() => setOther((o) => o + 1)}>Clique</button>
    </>
  );
}
