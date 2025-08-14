import { Suspense } from "react";
import MainLoader from "../../components/loader/MainLoader";

interface LazyRouteProps {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  fallback?: React.ReactNode;
}

const LazyRoute = ({ component: Component, fallback }: LazyRouteProps) => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
          }}
        >
          {fallback || <MainLoader />}
        </div>
      }
    >
      <Component />
    </Suspense>
  );
};

export default LazyRoute;
