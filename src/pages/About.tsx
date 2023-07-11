import { FC } from "react";
import { Helmet } from "react-helmet";

export const About: FC = () => {
  return (
    <>
      <Helmet>
        <title>About page</title>
      </Helmet>
      <h1 data-testid="page-title" className="testClass">About</h1>
      <p>This is an example application.</p>
    </>
  );
};
