import { useState, useEffect } from 'react';
import { getEvents } from '../../services/api';
import Header from '../../components/Header/Header';
import EventCard from '../../components/EventCard/EventCard';
import FilterList from '../../components/FilterList/FilterList';
import Modal from '../../components/Modal/Modal';
import TypingEffect from '../../components/TypingEffect/TypingEffect';
import '../../styles/base.css';
import '../../styles/index.css';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [activeFilter, setActiveFilter] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Advanced filters state
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [priceFilter, setPriceFilter] = useState('any');

    // Fetch events from API (R5)
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const data = await getEvents();
                setEvents(data);
                setFilteredEvents(data);
            } catch (err) {
                setError('Erro ao carregar eventos. Verifique se o servidor está rodando.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // Apply all filters
    const applyFilters = () => {
        let result = events;

        // Category filter
        if (activeFilter) {
            result = result.filter(event => event.category === activeFilter);
        }

        // Search term filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(event =>
                event.title.toLowerCase().includes(term) ||
                event.location.name.toLowerCase().includes(term) ||
                event.description.toLowerCase().includes(term)
            );
        }

        // Date filter
        if (startDate) {
            const start = new Date(startDate);
            start.setHours(0, 0, 0, 0);
            result = result.filter(event => new Date(event.date) >= start);
        }

        if (endDate) {
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
            result = result.filter(event => new Date(event.date) <= end);
        }

        // Price filter
        if (priceFilter === 'free') {
            result = result.filter(event => event.price === 0);
        } else if (priceFilter === 'paid') {
            result = result.filter(event => event.price > 0);
        }

        setFilteredEvents(result);
    };

    // Apply filters when dependencies change
    useEffect(() => {
        applyFilters();
    }, [activeFilter, searchTerm, events, startDate, endDate, priceFilter]);

    const handleFilterChange = (category) => {
        setActiveFilter(category);
    };

    const handleSearch = (e) => {
        e.preventDefault();
    };

    const handleApplyFilters = () => {
        applyFilters();
        setIsModalOpen(false);
    };

    const handleClearFilters = () => {
        setActiveFilter(null);
        setStartDate('');
        setEndDate('');
        setPriceFilter('any');
    };

    return (
        <>
            <Header />

            <main>
                <section className="hero-section">
                    <div className="container">
                        <h1>
                            <TypingEffect text="Descubra os melhores rolês!" speed={70} />
                        </h1>
                        <p>
                            A sua agenda definitiva para eventos universitários, culturais e as
                            melhores festas da cidade.
                        </p>
                        <div className="search-container">
                            <form className="hero-search" onSubmit={handleSearch}>
                                <input
                                    type="text"
                                    placeholder="Busque por um evento, local ou data..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button type="submit" className="hero-button">Buscar</button>
                            </form>
                            <button
                                className="advanced-filter-button"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Filtros Avançados
                            </button>
                        </div>
                    </div>
                </section>

                <div className="main-content">
                    <div className="container">
                        <FilterList
                            activeFilter={activeFilter}
                            onFilterChange={handleFilterChange}
                        />

                        {loading && (
                            <p style={{ textAlign: 'center', padding: '40px' }}>
                                Carregando eventos...
                            </p>
                        )}

                        {error && (
                            <p style={{ textAlign: 'center', padding: '40px', color: 'red' }}>
                                {error}
                            </p>
                        )}

                        {!loading && !error && (
                            <div className="events-grid">
                                {filteredEvents.map(event => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                        )}

                        {!loading && !error && filteredEvents.length === 0 && (
                            <p style={{ textAlign: 'center', padding: '40px' }}>
                                Nenhum evento encontrado.
                            </p>
                        )}
                    </div>
                </div>
            </main>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Filtros Avançados"
                footer={
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            className="apply-filters-button"
                            style={{ flex: 1, backgroundColor: 'var(--cor-texto-secundario)' }}
                            onClick={handleClearFilters}
                        >
                            Limpar
                        </button>
                        <button
                            className="apply-filters-button"
                            style={{ flex: 2 }}
                            onClick={handleApplyFilters}
                        >
                            Aplicar Filtros
                        </button>
                    </div>
                }
            >
                <div className="form-group">
                    <label>Categoria do Rolê</label>
                    <div className="category-buttons">
                        {['Todos', 'Festas', 'Acadêmico', 'Cultural', 'Esporte'].map(cat => (
                            <a
                                key={cat}
                                href="#"
                                className={
                                    (cat === 'Todos' && !activeFilter) ||
                                        (cat === 'Festas' && activeFilter === 'Festa') ||
                                        (activeFilter === cat)
                                        ? 'active'
                                        : ''
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleFilterChange(cat === 'Todos' ? null : (cat === 'Festas' ? 'Festa' : cat));
                                }}
                            >
                                {cat}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label>Data</label>
                    <div className="date-inputs">
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <span>até</span>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Preço</label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="price"
                                value="any"
                                checked={priceFilter === 'any'}
                                onChange={(e) => setPriceFilter(e.target.value)}
                            />
                            Qualquer
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="price"
                                value="free"
                                checked={priceFilter === 'free'}
                                onChange={(e) => setPriceFilter(e.target.value)}
                            />
                            Grátis
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="price"
                                value="paid"
                                checked={priceFilter === 'paid'}
                                onChange={(e) => setPriceFilter(e.target.value)}
                            />
                            Pago
                        </label>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Home;
