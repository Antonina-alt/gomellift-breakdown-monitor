import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { NAVIGATION_LINKS } from '../constants/navigation.js';
import logo from '../assets/gomelliftlogo.png';

function AppNavbar() {
    return (
        <Navbar expand="lg" sticky="top" className="app-navbar navbar-dark shadow-sm">
            <Container fluid className="px-3 px-lg-4">
                <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center gap-3 text-white">
                    <Logo />
                    <BrandText />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Navigation />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

function Logo() {
    return <img className="app-navbar__logo" src={logo} alt="Гомельлифт" />;
}

function BrandText() {
    return (
        <div className="lh-sm">
            <div className="fw-bold text-white">Гомельлифт</div>
            <div className="small text-light opacity-75">Мониторинг поломок лифтов</div>
        </div>
    );
}

function Navigation() {
    return <Nav className="ms-auto">{NAVIGATION_LINKS.map((link) => <NavigationLink key={link.to} {...link} />)}</Nav>;
}

function NavigationLink({ to, label, end }) {
    return <Nav.Link as={NavLink} to={to} end={end} className="text-light">{label}</Nav.Link>;
}

export default AppNavbar;
