import { FC } from 'react';
import { Switch, Route, Link  } from 'react-router-dom';

import { About } from './pages/About';
import { Home } from './pages/Home';

export const Application: FC = () => {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </nav>
            <Switch>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </div>
    );
} 