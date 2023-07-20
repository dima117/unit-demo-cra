import { FC } from "react";
import { Routes, Route, Link } from "react-router-dom";

import { About } from "./pages/About";
import { Home } from "./pages/Home";

export const Application: FC = () => {
  const home = <Home />;
  const about = <About />;

  return (
    <div>
      <nav>
        <Link data-testid="link-home" to="/unit-demo-cra">
          Home
        </Link>
        <Link to="/unit-demo-cra/about">About</Link>
      </nav>
      <Routes>
        <Route path="/unit-demo-cra/about" element={about} />
        <Route path="/unit-demo-cra" element={home} />
      </Routes>
    </div>
  );
};
