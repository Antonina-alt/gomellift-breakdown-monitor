import { REFRESH_DATA_INTERVAL_LABEL } from '../config/api.js';
import StatusCard from './StatusCard.jsx';

function StatusCards({ stoppedCount, lastUpdated }) {
    return (
        <div className="row g-3 mb-4">
            <StatusCard title="Остановлено лифтов" value={stoppedCount} />
            <StatusCard title="Последнее обновление" value={lastUpdated} />
            <StatusCard title="Интервал обновления" value={REFRESH_DATA_INTERVAL_LABEL} />
        </div>
    );
}

export default StatusCards;
