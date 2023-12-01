import { Link } from 'react-router-dom';
import ReportIndexItem from './ReportIndexItem';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetDatabase } from '../mocks/storage';
import { reportsArray, thunkAllReports } from '../store/reports';

const ReportsIndex = () => {
  const dispatch = useDispatch();
  const reports = useSelector(reportsArray); // populate from Redux store
  useEffect(() => {
    dispatch(thunkAllReports())
  }, [dispatch])

  if (!reports) return 'LOADING > > >'
  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <section>
      <ul>
        {reports.map((report) => (
          <ReportIndexItem
            report={report}
            key={report.id}
          />
        ))}
      </ul>
      <Link
        className="back-button new"
        to="/reports/new"
      >
        New Report
      </Link>
      <button onClick={resetDatabase}>Reset the Database</button>
    </section>
  );
};

export default ReportsIndex;
