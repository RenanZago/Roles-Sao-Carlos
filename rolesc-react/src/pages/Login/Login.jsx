import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import '../../styles/base.css';
import '../../styles/auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await loginUser(email, password);

            if (result.success) {
                login(result.user); // R6 - Saves to localStorage via AuthContext
                navigate('/');
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('Erro ao fazer login. Verifique sua conexão.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <header className="main-header auth-header">
                <div className="header-container">
                    <Link to="/" className="logo">RoleSC</Link>
                </div>
            </header>

            <main className="auth-main">
                <div className="container">
                    <div className="form-container">
                        <h1 className="page-title">Bem-vindo de volta!</h1>

                        {error && (
                            <div className="alert-message error">{error}</div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="seuemail@exemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Senha</label>
                                <div className="password-wrapper">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        placeholder="Sua senha"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <span
                                        className="toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? '🙈' : '👁️'}
                                    </span>
                                </div>
                            </div>

                            <div className="form-options">
                                <div className="checkbox-group">
                                    <input type="checkbox" id="remember" name="remember" />
                                    <label htmlFor="remember">Lembrar de mim</label>
                                </div>
                                <Link to="/esqueci-senha" className="forgot-password">
                                    Esqueceu a senha?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className="submit-button"
                                disabled={loading}
                            >
                                {loading ? 'Entrando...' : 'Entrar'}
                            </button>
                        </form>

                        <p className="switch-form">
                            Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Login;
