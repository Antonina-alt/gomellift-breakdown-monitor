function Card({ children, className = '' }) {
    return <div className={`card border rounded-1 shadow-sm ${className}`}>{children}</div>;
}

export default Card;
