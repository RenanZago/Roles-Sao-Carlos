import { useState, useEffect, useRef } from 'react';
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
    const [popover, setPopover] = useState({ visible: false, title: '', time: '', color: '', top: 0, left: 0 });
    const popoverRef = useRef(null);
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

    const handleEventMouseEnter = (info) => {
        const eventRect = info.el.getBoundingClientRect();
        const popoverHeight = 60; // approximate height
        const popoverWidth = 180; // approximate width

        let top = eventRect.top + window.scrollY - popoverHeight - 10;
        if (top < window.scrollY) {
            top = eventRect.bottom + window.scrollY + 10;
        }

        let left = eventRect.left + window.scrollX + (eventRect.width / 2) - (popoverWidth / 2);
        if (left < 10) left = 10;
        if (left + popoverWidth > window.innerWidth - 10) {
            left = window.innerWidth - popoverWidth - 10;
        }

        const timeStr = info.event.allDay
            ? 'O dia todo'
            : info.event.start.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        setPopover({
            visible: true,
            title: info.event.title,
            time: timeStr,
            color: info.event.backgroundColor || 'var(--cor-primaria)',
            top,
            left,
        });
    };

    const handleEventMouseLeave = () => {
        setPopover(prev => ({ ...prev, visible: false }));
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
                                eventMouseEnter={handleEventMouseEnter}
                                eventMouseLeave={handleEventMouseLeave}
                            />
                        </div>
                    )}
                </div>
            </main>

            {/* Event Popover */}
            <div
                ref={popoverRef}
                id="event-popover"
                className={popover.visible ? 'visible' : ''}
                style={{ top: popover.top, left: popover.left }}
            >
                <h4 id="popover-title" style={{ color: popover.color }}>{popover.title}</h4>
                <p id="popover-time">{popover.time}</p>
            </div>
        </>
    );
};

export default Calendar;
