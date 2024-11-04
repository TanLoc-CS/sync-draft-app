import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";

export const RequiredAuth: React.FC<any> = ({
  children,
  ...args
}): React.ReactElement=> {
  const Children = withAuthenticationRequired(children, args);
  return <Children />;
};