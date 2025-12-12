import { Link } from 'react-router-dom';

const CATEGORY_COLORS = {
    'Festa': 'var(--cor-amarelo)',
    'Acadêmico': 'var(--cor-azul)',
    'Cultural': 'var(--cor-rosa)',
    'Esporte': 'var(--cor-verde)',
};

const EventCard = ({ event }) => {
    const categoryColor = CATEGORY_COLORS[event.category] || 'var(--cor-primaria)';

    return (
        <div className="event-card">
            <div
                className="event-card-image"
                style={{ backgroundImage: `url('${event.imageUrl}')` }}
            />
            <div className="event-card-body">
                <span
                    className="event-tag"
                    style={{ backgroundColor: categoryColor }}
                >
                    {event.category}
                </span>
                <h3>{event.title}</h3>
                <p className="event-info">
                    <strong>{formatDate(event.date)}</strong> • {event.location.name}
                </p>
                <Link to={`/evento/${event.id}`} className="card-button">
                    Ver Detalhes
                </Link>
            </div>
        </div>
    );
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        timeZone: 'America/Sao_Paulo'
    };
    return new Intl.DateTimeFormat('pt-BR', options).format(date);
};

export default EventCard;
