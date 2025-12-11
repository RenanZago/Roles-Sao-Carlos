import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, getUsers } from '../../services/api';
import '../../styles/base.css';
import '../../styles/auth.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        if (password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        setLoading(true);

        try {
            const users = await getUsers();
            if (users.some(u => u.email === email)) {
                setError('Este email já está cadastrado.');
                setLoading(false);
                return;
            }

            await registerUser({ name, email, password });

            setSuccess('Cadastro realizado com sucesso! Redirecionando...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError('Erro ao fazer cadastro. Verifique sua conexão.');
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
                        <h1 className="page-title">Crie sua conta</h1>

                        {error && (
                            <div className="alert-message error">{error}</div>
                        )}

                        {success && (
                            <div className="alert-message success">{success}</div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Nome completo</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Seu nome"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

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
                                        placeholder="Mínimo 6 caracteres"
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

                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirmar senha</label>
                                <div className="password-wrapper">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="Repita a senha"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="submit-button"
                                disabled={loading}
                            >
                                {loading ? 'Cadastrando...' : 'Cadastrar'}
                            </button>
                        </form>

                        <p className="switch-form">
                            Já tem uma conta? <Link to="/login">Faça login</Link>
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Register;
