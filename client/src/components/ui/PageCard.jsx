import Card from './Card.jsx';
import CardBody from './CardBody.jsx';

function PageCard({ children }) {
    return (
        <Card>
            <CardBody>{children}</CardBody>
        </Card>
    );
}

export default PageCard;
