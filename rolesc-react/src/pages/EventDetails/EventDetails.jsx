import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEventById } from '../../services/api';
import Header from '../../components/Header/Header';
import '../../styles/base.css';
import '../../styles/detalhes.css';

const CATEGORY_COLORS = {
    'Festa': 'var(--cor-amarelo)',
    'Acadêmico': 'var(--cor-azul)',
    'Cultural': 'var(--cor-rosa)',
    'Esporte': 'var(--cor-verde)',
};

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true);
                const data = await getEventById(id);
                setEvent(data);
            } catch (err) {
                setError('Erro ao carregar evento.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    if (loading) {
        return (
            <>
                <Header />
                <main>
                    <div style={{ padding: '120px 20px', textAlign: 'center' }}>
                        Carregando evento...
                    </div>
                </main>
            </>
        );
    }

    if (error || !event) {
        return (
            <>
                <Header />
                <main>
                    <div style={{ padding: '120px 20px', textAlign: 'center' }}>
                        {error || 'Evento não encontrado.'}
                        <br />
                        <Link to="/" style={{ color: 'var(--cor-primaria)' }}>
                            Voltar para o Feed
                        </Link>
                    </div>
                </main>
            </>
        );
    }

    const startDate = new Date(event.date);
    const endDate = new Date(startDate.getTime() + event.durationHours * 60 * 60 * 1000);

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'America/Sao_Paulo',
        }).format(date);
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'America/Sao_Paulo',
        });
    };

    const categoryColor = CATEGORY_COLORS[event.category] || 'var(--cor-primaria)';
    const mapUrl = `https://maps.google.com/maps?q=${event.location.latitude},${event.location.longitude}&hl=pt-BR&z=15&output=embed`;

    return (
        <>
            <Header />

            <main>
                <div
                    className="event-hero"
                    style={{ backgroundImage: `url('${event.imageUrl}')` }}
                />

                <div className="event-content">
                    <div className="details-grid">
                        <div className="event-main-details">
                            <span
                                className="event-category"
                                style={{ backgroundColor: categoryColor }}
                            >
                                {event.category}
                            </span>

                            <h1 className="event-title">{event.title}</h1>

                            <div className="event-meta">
                                <span>🗓️ {formatDate(startDate)}</span>
                                <span>⏰ {formatTime(startDate)} – {formatTime(endDate)}</span>
                                <span>📍 {event.location.name}</span>
                            </div>

                            <div className="event-description">
                                <h2>Sobre o Evento</h2>
                                <p>{event.description}</p>
                            </div>

                            {event.price > 0 && (
                                <a href="#" className="cta-button">
                                    Comprar Ingresso
                                </a>
                            )}
                        </div>

                        <div className="event-sidebar">
                            <div className="info-box">
                                <h3>Detalhes</h3>
                                <ul>
                                    <li>
                                        <strong>Organizador:</strong> {event.organizer}
                                    </li>
                                    <li>
                                        <strong>Preço:</strong>{' '}
                                        {event.price === 0
                                            ? 'Gratuito'
                                            : `A partir de R$ ${event.price.toFixed(2).replace('.', ',')}`
                                        }
                                    </li>
                                    {event.ticketPlatform && (
                                        <li>
                                            <strong>Ingressos:</strong> Online via {event.ticketPlatform}
                                        </li>
                                    )}
                                    <li>
                                        <strong>Classificação:</strong> {event.ageRating}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="map-container">
                        <h2>Localização</h2>
                        <iframe
                            src={mapUrl}
                            allowFullScreen=""
                            loading="lazy"
                            title="Mapa do evento"
                        />
                    </div>
                </div>
            </main>
        </>
    );
};

export default EventDetails;
