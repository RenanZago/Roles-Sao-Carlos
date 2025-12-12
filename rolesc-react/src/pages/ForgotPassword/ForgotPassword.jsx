import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/base.css';
import '../../styles/auth.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setSuccess('Se o email existir em nossa base, você receberá instruções para redefinir sua senha.');
            setLoading(false);
        }, 1000);
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
                        <h1 className="page-title">Esqueci minha senha</h1>
                        <p style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--cor-texto-secundario)' }}>
                            Digite seu email e enviaremos instruções para redefinir sua senha.
                        </p>

                        {success && (
                            <div className="alert-message success">{success}</div>
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

                            <button
                                type="submit"
                                className="submit-button"
                                disabled={loading}
                            >
                                {loading ? 'Enviando...' : 'Enviar instruções'}
                            </button>
                        </form>

                        <p className="switch-form">
                            Lembrou a senha? <Link to="/login">Faça login</Link>
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ForgotPassword;
