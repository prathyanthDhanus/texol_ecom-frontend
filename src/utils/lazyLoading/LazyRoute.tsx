import { Suspense } from "react";
import MainLoader from "../../components/loader/MainLoader";

interface LazyRouteProps {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  fallback?: React.ReactNode;
}

const LazyRoute = ({ component: Component, fallback }: LazyRouteProps) => {
  return (
    <Suspense fallback={fallback || <MainLoader />}>
      <Component />
    </Suspense>
  );
};

export default LazyRoute;
