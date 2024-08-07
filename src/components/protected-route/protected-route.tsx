import { Navigate, useLocation } from "react-router";
import { FC, ReactElement } from "react";
import useAppSelector from "../../hooks/useAppSelector";

type TProtectedProps = {
  component: ReactElement;
  onlyUnAuth?: boolean;
};

const Protected: FC<TProtectedProps> = ({ component, onlyUnAuth = false }) => {
  const isAuthChecked = useAppSelector((store) => store.userData.isAuthChecked);

  const user = useAppSelector((store) => store.userData.user);
  const location = useLocation();

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={`/login`} state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: { component: ReactElement }) => (
  <Protected onlyUnAuth={true} component={component} />
);
