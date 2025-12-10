import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header/Header';
import '../../styles/base.css';
import '../../styles/adicionar-evento.css';

const AddEvent = () => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        durationHours: '',
        category: '',
        imageUrl: '',
        locationName: '',
        price: '',
        ticketPlatform: '',
        isFree: false,
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Redirect if not logged in
    if (!isLoggedIn) {
        return (
            <>
                <Header />
                <main className="add-event-main main-content">
                    <div className="container">
                        <div className="form-container">
                            <h1 className="page-title">Acesso Restrito</h1>
                            <p style={{ textAlign: 'center', marginBottom: '24px' }}>
                                Você precisa estar logado para adicionar eventos.
                            </p>
                            <button
                                className="submit-button"
                                onClick={() => navigate('/login')}
                            >
                                Fazer Login
                            </button>
                        </div>
                    </div>
                </main>
            </>
        );
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Build event object
            const eventData = {
                title: formData.title,
                description: formData.description,
                date: new Date(formData.date).toISOString(),
                durationHours: parseInt(formData.durationHours),
                category: formData.category.charAt(0).toUpperCase() + formData.category.slice(1),
                imageUrl: formData.imageUrl,
                organizer: 'Usuário',
                location: {
                    name: formData.locationName,
                    latitude: -22.0177 + (Math.random() - 0.5) * 0.02,
                    longitude: -47.8913 + (Math.random() - 0.5) * 0.02,
                },
                price: formData.isFree ? 0 : parseFloat(formData.price) || 0,
                ticketPlatform: formData.isFree ? null : formData.ticketPlatform || null,
                ageRating: 'Livre',
            };

            await createEvent(eventData);
            navigate('/');
        } catch (err) {
            setError('Erro ao criar evento. Verifique sua conexão.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />

            <main className="add-event-main main-content">
                <div className="container">
                    <h1 className="page-title">Adicionar Novo Evento</h1>

                    <div className="form-container">
                        {error && (
                            <div className="alert-message error">{error}</div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-section">
                                <h2>Sobre o Evento</h2>

                                <div className="form-group">
                                    <label htmlFor="title">Título do Evento</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        placeholder="Ex: Festa da Bateria"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">Descrição</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder="Conte mais sobre o seu evento..."
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="row">
                                    <div className="form-group">
                                        <label htmlFor="date">Data e Hora de Início</label>
                                        <input
                                            type="datetime-local"
                                            id="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="durationHours">Duração (em horas)</label>
                                        <input
                                            type="number"
                                            id="durationHours"
                                            name="durationHours"
                                            placeholder="Ex: 6"
                                            value={formData.durationHours}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group">
                                        <label htmlFor="category">Categoria</label>
                                        <select
                                            id="category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="" disabled>Selecione uma categoria</option>
                                            <option value="festa">Festa</option>
                                            <option value="academico">Acadêmico</option>
                                            <option value="cultural">Cultural</option>
                                            <option value="esporte">Esporte</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="imageUrl">URL da Imagem do Evento</label>
                                        <input
                                            type="url"
                                            id="imageUrl"
                                            name="imageUrl"
                                            placeholder="https://..."
                                            value={formData.imageUrl}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr className="form-divider" />

                            <div className="form-section">
                                <h2>Localização</h2>
                                <div className="form-group">
                                    <label htmlFor="locationName">Nome do Local</label>
                                    <input
                                        type="text"
                                        id="locationName"
                                        name="locationName"
                                        placeholder="Ex: Em frente ao ginásio"
                                        value={formData.locationName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <hr className="form-divider" />

                            <div className="form-section">
                                <h2>Ingressos</h2>
                                <div className="row">
                                    <div className="form-group">
                                        <label htmlFor="price">Preço (R$)</label>
                                        <input
                                            type="number"
                                            id="price"
                                            name="price"
                                            placeholder="Ex: 25,00"
                                            step="0.01"
                                            min="0"
                                            value={formData.price}
                                            onChange={handleChange}
                                            disabled={formData.isFree}
                                            style={{ backgroundColor: formData.isFree ? '#e9ecef' : '' }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="ticketPlatform">Plataforma de Venda</label>
                                        <input
                                            type="text"
                                            id="ticketPlatform"
                                            name="ticketPlatform"
                                            placeholder="Ex: Sympla"
                                            value={formData.ticketPlatform}
                                            onChange={handleChange}
                                            disabled={formData.isFree}
                                            style={{ backgroundColor: formData.isFree ? '#e9ecef' : '' }}
                                        />
                                    </div>
                                </div>
                                <div className="checkbox-group">
                                    <input
                                        type="checkbox"
                                        id="isFree"
                                        name="isFree"
                                        checked={formData.isFree}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="isFree">Evento Gratuito</label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="submit-button"
                                disabled={loading}
                            >
                                {loading ? 'Publicando...' : 'Publicar Evento'}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
};

export default AddEvent;
