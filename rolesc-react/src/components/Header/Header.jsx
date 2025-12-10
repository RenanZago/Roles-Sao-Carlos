import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/header.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isLoggedIn, logout } = useAuth();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container header-container">
                <Link to="/" className="logo">RoleSC</Link>

                <div
                    className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>

                {/* Mobile Navigation */}
                <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
                    <ul>
                        <li>
                            <Link
                                to="/"
                                className={isActive('/') ? 'active' : ''}
                                onClick={closeMenu}
                            >
                                Feed
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/calendario"
                                className={isActive('/calendario') ? 'active' : ''}
                                onClick={closeMenu}
                            >
                                Calendário
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/mapa"
                                className={isActive('/mapa') ? 'active' : ''}
                                onClick={closeMenu}
                            >
                                Mapa
                            </Link>
                        </li>
                        <li className="nav-auth-links-mobile">
                            {isLoggedIn ? (
                                <>
                                    <Link to="/adicionar-evento" onClick={closeMenu}>Adicionar Evento</Link>
                                    <a href="#" onClick={(e) => { e.preventDefault(); logout(); closeMenu(); }}>Sair</a>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={closeMenu}>Login</Link>
                                    <Link to="/cadastro" className="nav-register-link" onClick={closeMenu}>Cadastro</Link>
                                </>
                            )}
                        </li>
                    </ul>
                </nav>

                {/* Desktop Navigation */}
                <nav className="nav-desktop">
                    <ul>
                        <li>
                            <Link to="/" className={isActive('/') ? 'active' : ''}>Feed</Link>
                        </li>
                        <li>
                            <Link to="/calendario" className={isActive('/calendario') ? 'active' : ''}>Calendário</Link>
                        </li>
                        <li>
                            <Link to="/mapa" className={isActive('/mapa') ? 'active' : ''}>Mapa</Link>
                        </li>
                        <li>
                            {isLoggedIn ? (
                                <div className="auth-dropdown">
                                    <button className="drop-button">Menu</button>
                                    <div className="auth-dropdown-content">
                                        <Link to="/adicionar-evento">Adicionar Evento</Link>
                                        <a href="#" onClick={(e) => { e.preventDefault(); logout(); }}>Sair</a>
                                    </div>
                                </div>
                            ) : (
                                <div className="auth-dropdown">
                                    <button className="drop-button">Entrar</button>
                                    <div className="auth-dropdown-content">
                                        <Link to="/login">Login</Link>
                                        <Link to="/cadastro">Cadastro</Link>
                                    </div>
                                </div>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
