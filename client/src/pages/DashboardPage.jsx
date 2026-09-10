import StatusCards from '../components/StatusCards.jsx';
import BreakdownsTable from '../components/BreakdownsTable.jsx';
import { useBreakdowns } from '../hooks/useBreakdowns.js';

function DashboardPage() {
    const { breakdowns, lastUpdated, loading, error } = useBreakdowns();

    if (loading) {
        return (
            <div className="d-flex flex-column align-items-center py-5">
                <div className="spinner-border" aria-hidden="true"/>
                <div className="mt-3 text-muted">Загрузка данных...</div>
            </div>
        );
    }

    return (
        <>
            <StatusCards stoppedCount={breakdowns.length} lastUpdated={lastUpdated} />
            {error && <div className="alert alert-warning" role="alert">{error}</div>}
            <BreakdownsTable data={breakdowns} />
        </>
    );
}

export default DashboardPage;
