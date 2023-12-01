import { useParams } from 'react-router-dom';
import ReportForm from './ReportForm';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { thunkReceiveReport } from '../store/reports';

const EditReportForm = () => {
  const dispatch = useDispatch();
  const { reportId } = useParams();
  const report = useSelector((store) => store.reports[reportId])
  useEffect(() => {
    dispatch(thunkReceiveReport(reportId))
  }, [dispatch, reportId])

  if (!report) return(<>{`L O A D I N G > > >`}</>);

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    Object.keys(report).length > 1 && (
      <>
        <ReportForm
          report={report}
          formType="Update Report"
        />
      </>
    )
  );
};

export default EditReportForm;
