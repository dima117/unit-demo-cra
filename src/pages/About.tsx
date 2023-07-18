import { FC } from "react";
import { Helmet } from "react-helmet";

export const About: FC = () => {
  return (
    <>
      <Helmet>
        <title>О нас</title>
      </Helmet>
      <h1 data-testid="page-title">About</h1>
      <p>Пример приложения.</p>
    </>
  );
};
