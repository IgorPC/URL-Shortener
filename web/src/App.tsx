import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.tsx';
import Redirect from './pages/Redirect/Redirect.tsx';
import Statistics from './pages/Statistics';
import NotFound from "./pages/NotFound.tsx";
import Error from "./pages/Error.tsx";
import './App.css';
import Inactive from "./pages/Inactive.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/rd/:id" element={<Redirect />} />
                <Route path="/statistics/:id" element={<Statistics />} />

                <Route path="/error" element={<Error />} />
                <Route path="/inactive" element={<Inactive />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;