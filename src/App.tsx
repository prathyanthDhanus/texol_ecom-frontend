import { RouterProvider } from "react-router-dom";
import AuthInitializer from "./components/AuthInitializer";
import { useRouter } from "./routes";

function App() {
  const router = useRouter();

  return (
    <>
      <AuthInitializer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
