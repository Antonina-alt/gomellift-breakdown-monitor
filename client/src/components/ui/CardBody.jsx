function CardBody({ children, className = 'p-4' }) {
    return <div className={`card-body ${className}`}>{children}</div>;
}

export default CardBody;
