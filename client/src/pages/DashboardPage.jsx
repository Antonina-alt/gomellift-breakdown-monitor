import StatusCards from '../components/StatusCards.jsx';
import BreakdownsTable from '../components/BreakdownsTable.jsx';
import { useBreakdowns } from '../hooks/useBreakdowns.js';

function DashboardPage() {
    const { breakdowns, lastUpdated, error } = useBreakdowns();

    return (
        <>
            <StatusCards stoppedCount={breakdowns.length} lastUpdated={lastUpdated} />
            {error && <div className="alert alert-warning" role="alert">{error}</div>}
            <BreakdownsTable data={breakdowns} />
        </>
    );
}

export default DashboardPage;
