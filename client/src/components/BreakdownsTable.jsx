import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';
import 'datatables.net-responsive-bs5';
import SectionHeader from './ui/SectionHeader.jsx';
import Card from './ui/Card.jsx';
import CardBody from './ui/CardBody.jsx';
import { breakdownsTableColumns } from '../features/breakdowns/breakdownsTableColumns.js';
import { breakdownsTableOptions } from '../features/breakdowns/breakdownsTableOptions.js';

DataTable['use'](DT);

function BreakdownsTable({ data }) {
    return (
        <Card>
            <CardBody className="p-3 p-lg-4">
                <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-3">
                    <SectionHeader title="Текущие поломки" description="Список заявок по остановленным или неисправным лифтам" />
                </div>
                <DataTable data={data} columns={breakdownsTableColumns} className="table table-hover table-bordered align-middle text-start w-100 mb-0" options={breakdownsTableOptions} />
            </CardBody>
        </Card>
    );
}

export default BreakdownsTable;
