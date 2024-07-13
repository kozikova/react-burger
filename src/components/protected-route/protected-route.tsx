import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { FC, ReactElement } from "react";

type TProtectedProps = {
  component: ReactElement;
  onlyUnAuth?: boolean;
};

const Protected: FC<TProtectedProps> = ({ component, onlyUnAuth = false }) => {
  //на следующем спринте
  //@ts-ignore
  const isAuthChecked = useSelector((store) => store.userData.isAuthChecked);
  //на следующем спринте
  //@ts-ignore
  const user = useSelector((store) => store.userData.user);
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
