import Card from './ui/Card.jsx';
import CardBody from './ui/CardBody.jsx';

function StatusCard({ title, value }) {
    return (
        <div className="col-12 col-md-4">
            <Card className="h-100">
                <CardBody className="p-3">
                    <div className="text-secondary small mb-2">{title}</div>
                    <div className="fs-5 fw-semibold text-primary-emphasis">{value}</div>
                </CardBody>
            </Card>
        </div>
    );
}

export default StatusCard;
