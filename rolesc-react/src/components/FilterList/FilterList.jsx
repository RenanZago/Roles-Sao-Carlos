import { useState, useRef, useEffect } from 'react';

const FILTERS = [
    { name: 'Todos', color: 'var(--cor-primaria)' },
    { name: 'Festas', color: 'var(--cor-amarelo)', category: 'Festa' },
    { name: 'Acadêmico', color: 'var(--cor-azul)', category: 'Acadêmico' },
    { name: 'Cultural', color: 'var(--cor-rosa)', category: 'Cultural' },
    { name: 'Esporte', color: 'var(--cor-verde)', category: 'Esporte' },
];

const FilterList = ({ activeFilter, onFilterChange }) => {
    const [bgStyle, setBgStyle] = useState({});
    const filterRefs = useRef([]);

    useEffect(() => {
        const activeIndex = FILTERS.findIndex(f =>
            f.category === activeFilter || (f.name === 'Todos' && !activeFilter)
        );
        if (activeIndex !== -1 && filterRefs.current[activeIndex]) {
            const el = filterRefs.current[activeIndex];
            setBgStyle({
                width: `${el.offsetWidth}px`,
                left: `${el.offsetLeft}px`,
                backgroundColor: FILTERS[activeIndex].color,
            });
        }
    }, [activeFilter]);

    const handleClick = (filter, index) => {
        onFilterChange(filter.category || null);
    };

    return (
        <div className="filter-container-wrapper">
            <ul className="filter-list">
                <span className="active-filter-bg" style={bgStyle}></span>
                {FILTERS.map((filter, index) => (
                    <li key={filter.name}>
                        <a
                            href="#"
                            ref={el => filterRefs.current[index] = el}
                            className={
                                (filter.category === activeFilter) ||
                                    (filter.name === 'Todos' && !activeFilter)
                                    ? 'active'
                                    : ''
                            }
                            data-color={filter.color}
                            onClick={(e) => {
                                e.preventDefault();
                                handleClick(filter, index);
                            }}
                        >
                            {filter.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilterList;
