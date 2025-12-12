import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { getEvents } from '../../services/api';
import { useGeolocation } from '../../hooks/useGeolocation';
import Header from '../../components/Header/Header';
import 'leaflet/dist/leaflet.css';
import '../../styles/base.css';
import '../../styles/mapa.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const createColoredIcon = (color) => {
    const colorMap = {
        'amarelo': 'yellow',
        'azul': 'blue',
        'verde': 'green',
        'rosa': 'violet',
    };

    return new L.Icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${colorMap[color] || 'red'}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });
};

const CATEGORY_ICON_COLORS = {
    'Festa': 'amarelo',
    'Acadêmico': 'azul',
    'Cultural': 'rosa',
    'Esporte': 'verde',
};

const CATEGORY_CSS_COLORS = {
    'Festa': 'var(--cor-amarelo)',
    'Acadêmico': 'var(--cor-azul)',
    'Cultural': 'var(--cor-rosa)',
    'Esporte': 'var(--cor-verde)',
};

const LocationMarker = ({ position, shouldFlyTo }) => {
    const map = useMap();

    useEffect(() => {
        if (position && shouldFlyTo) {
            map.flyTo(position, 16);
        }
    }, [position, map, shouldFlyTo]);

    if (!position) return null;

    return (
        <CircleMarker
            center={position}
            radius={8}
            fillColor="#3388ff"
            color="#fff"
            weight={2}
            opacity={1}
            fillOpacity={0.9}
        >
            <Popup><b>Você está aqui!</b></Popup>
        </CircleMarker>
    );
};

const LocateButton = ({ onClick, disabled }) => {
    return (
        <button
            className="locate-btn"
            onClick={onClick}
            disabled={disabled}
            title="Ir para minha localização"
        >
            <FaMapMarkerAlt /> Minha Localização
        </button>
    );
};

const Map = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [flyToUser, setFlyToUser] = useState(0);
    const { latitude, longitude, loading: geoLoading } = useGeolocation();

    const saoCarlosCenter = [-22.0177, -47.8913];
    const userPosition = latitude && longitude ? [latitude, longitude] : null;

    const handleLocateClick = () => {
        if (userPosition) {
            setFlyToUser(prev => prev + 1);
        } else {
            alert('Não foi possível obter sua localização. Verifique se a permissão de localização está ativada.');
        }
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getEvents();
                setEvents(data);
            } catch (err) {
                console.error('Erro ao carregar eventos:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <>
            <Header />

            <main className="map-main main-content">
                <div className="container">
                    <div className="map-header">
                        <h1 className="page-title">Mapa de Eventos</h1>
                        <LocateButton
                            onClick={handleLocateClick}
                            disabled={geoLoading || !userPosition}
                        />
                    </div>

                    {loading ? (
                        <p style={{ textAlign: 'center', padding: '40px' }}>
                            Carregando mapa...
                        </p>
                    ) : (
                        <MapContainer
                            center={userPosition || saoCarlosCenter}
                            zoom={14}
                            id="map"
                            style={{ height: 'calc(100vh - var(--header-height) - 120px)', minHeight: '400px' }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {!geoLoading && <LocationMarker position={userPosition} shouldFlyTo={flyToUser} />}

                            {events.map(event => (
                                <Marker
                                    key={event.id}
                                    position={[event.location.latitude, event.location.longitude]}
                                    icon={createColoredIcon(CATEGORY_ICON_COLORS[event.category])}
                                >
                                    <Popup>
                                        <strong style={{ color: CATEGORY_CSS_COLORS[event.category] }}>
                                            {event.title}
                                        </strong>
                                        <br />
                                        Categoria: {event.category}
                                        <br />
                                        <Link to={`/evento/${event.id}`}>Ver detalhes</Link>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    )}
                </div>
            </main>
        </>
    );
};

export default Map;
