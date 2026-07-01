import { Outlet } from 'react-router-dom';
import AppNavbar from './AppNavbar.jsx';

function Layout() {
    return (
        <div className="min-vh-100 bg-body-tertiary">
            <AppNavbar />
            <main className="py-4">
                <div className="container-fluid px-3 px-lg-4">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default Layout;
