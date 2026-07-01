function SectionHeader({ title, description }) {
    return (
        <div>
            <h2 className="h4 fw-bold text-primary-emphasis mb-1">{title}</h2>
            {description && <p className="text-secondary mb-0">{description}</p>}
        </div>
    );
}

export default SectionHeader;
