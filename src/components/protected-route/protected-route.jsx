import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { getIsAuthChecked, getUser } from "../../services/userData";

import PropTypes from "prop-types";

const Protected = ({ component, onlyUnAuth = false }) => {
  //const isAuthChecked = useSelector(getIsAuthChecked);
  //const user = useSelector(getUser);
  const isAuthChecked = useSelector((store) => store.userData.isAuthChecked);
  const user = useSelector((store) => store.userData.user);
  const location = useLocation();

  if (!isAuthChecked) return null;

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
export const OnlyUnAuth = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);

Protected.propTypes = {
  onlyUnAuth: PropTypes.bool,
  component: PropTypes.node.isRequired,
};

OnlyUnAuth.propTypes = {
  component: PropTypes.node.isRequired,
};
