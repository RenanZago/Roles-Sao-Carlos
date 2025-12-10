import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { getEvents } from '../../services/api';
import Header from '../../components/Header/Header';
import '../../styles/base.css';
import '../../styles/calendario.css';

const CATEGORY_COLORS = {
    'Festa': 'var(--cor-amarelo)',
    'Acadêmico': 'var(--cor-azul)',
    'Cultural': 'var(--cor-rosa)',
    'Esporte': 'var(--cor-verde)',
};

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getEvents();
                const calendarEvents = data.map(event => ({
                    id: event.id,
                    title: event.title,
                    start: event.date,
                    color: CATEGORY_COLORS[event.category] || 'var(--cor-primaria)',
                    url: `/evento/${event.id}`,
                }));
                setEvents(calendarEvents);
            } catch (err) {
                console.error('Erro ao carregar eventos:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleEventClick = (info) => {
        info.jsEvent.preventDefault();
        if (info.event.url) {
            navigate(info.event.url);
        }
    };

    return (
        <>
            <Header />

            <main className="calendar-main main-content">
                <div className="container">
                    <h1 className="page-title">Agenda de Eventos</h1>

                    {loading ? (
                        <p style={{ textAlign: 'center', padding: '40px' }}>
                            Carregando calendário...
                        </p>
                    ) : (
                        <div id="calendar">
                            <FullCalendar
                                plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                                initialView="dayGridMonth"
                                locale="pt-br"
                                height="auto"
                                headerToolbar={{
                                    left: 'prev,next today',
                                    center: 'title',
                                    right: 'dayGridMonth,timeGridWeek,listWeek',
                                }}
                                buttonText={{
                                    today: 'Hoje',
                                    month: 'Mês',
                                    week: 'Semana',
                                    list: 'Lista',
                                }}
                                dayHeaderFormat={{ weekday: 'narrow' }}
                                eventTimeFormat={{
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false,
                                }}
                                events={events}
                                eventClick={handleEventClick}
                            />
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default Calendar;
