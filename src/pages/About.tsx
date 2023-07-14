import { type FC } from 'react';
import { Helmet } from 'react-helmet';

export const About: FC = () => {
  return (
    <>
      <Helmet>
        <title>About</title>
      </Helmet>
      <h1 data-testid="page-title">About</h1>
      <p>Example application.</p>
    </>
  );
};
