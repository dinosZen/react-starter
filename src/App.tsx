import { Button } from "@/components/ui/button";
import "./App.css";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <div className="flex flex-col items-center justify-center min-h-svh">
          <Button onClick={() => setCount((count) => count + 1)}>
            Click me
          </Button>
          <p className="text-2xl font-bold text-center">Count: {count}</p>
        </div>
      </div>
    </>
  );
}

export default App;
