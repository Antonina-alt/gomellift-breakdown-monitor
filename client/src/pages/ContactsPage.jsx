import Card from '../components/ui/Card.jsx';
import CardBody from '../components/ui/CardBody.jsx';

const companyContacts = [
    { label: 'Адрес', value: ['Республика Беларусь, 246034, г. Гомель,', 'ул. Владимирова, 8'] },
    { label: 'Приемная', value: ['+375 232 216-401'] },
    { label: 'Email', value: ['gomellift@gomellift.by', 'info@gomellift.by'] },
    { label: 'График работы', value: ['Понедельник — пятница: с 8:00 до 17:00', 'Обед: с 12:30 до 13:30'] },
];

const emergencyContacts = [
    { label: 'Единый мобильный номер', value: ['GSM: Vel, MTC, Life — 787-58-96'] },
    { label: 'Городские номера', value: ['+375 232 21-64-11', '+375 232 21-64-12'] },
];

function ContactsPage() {
    return (
        <div className="row g-4">
            <ContactColumn title="ЗАО «Гомельлифт»" contacts={companyContacts} />
            <ContactColumn title="Аварийная лифтовая служба" contacts={emergencyContacts} alert={<EmergencyAlert />} />
        </div>
    );
}

function ContactColumn({ title, contacts, alert }) {
    return (
        <div className="col-12 col-lg-6">
            <Card className="h-100">
                <CardBody>
                    <h2 className="h4 fw-semibold text-primary-emphasis mb-4">{title}</h2>
                    {alert}
                    {contacts.map((contact) => <ContactItem key={contact.label} {...contact} />)}
                </CardBody>
            </Card>
        </div>
    );
}

function EmergencyAlert() {
    return (
        <div className="alert alert-light border rounded-1 mb-4">
            <div className="fw-semibold text-primary-emphasis mb-1">Для срочного обращения при неисправности лифта</div>
            <div className="text-secondary">Используйте единый мобильный номер или городской номер аварийной службы.</div>
        </div>
    );
}

function ContactItem({ label, value }) {
    return (
        <div className="mb-3">
            <div className="text-secondary small mb-1">{label}</div>
            <div className="fw-semibold text-primary-emphasis">{value.map((line) => <ContactLine key={line} line={line} />)}</div>
        </div>
    );
}

function ContactLine({ line }) {
    return <div>{line}</div>;
}

export default ContactsPage;
