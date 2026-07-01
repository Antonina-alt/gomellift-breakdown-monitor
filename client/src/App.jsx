import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import { ROUTES } from './constants/routes.js';
import AboutPage from './pages/AboutPage.jsx';
import ContactsPage from './pages/ContactsPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.dashboard} element={<Layout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="contacts" element={<ContactsPage />} />
                    <Route path="*" element={<Navigate to={ROUTES.dashboard} replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
