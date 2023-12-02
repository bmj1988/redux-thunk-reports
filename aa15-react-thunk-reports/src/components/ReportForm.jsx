import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { thunkCreateReport, thunkUpdateReport } from '../store/reports';
import { useDispatch } from 'react-redux'

const ReportForm = ({ report, formType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [understanding, setUnderstanding] = useState(report?.understanding);
  const [improvement, setImprovement] = useState(report?.improvement);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    report = { ...report, understanding, improvement };
    if (formType === 'Create Report') {
      const newReport = await dispatch(thunkCreateReport(report))
      if (newReport.errors) {
        setErrors(newReport.errors)
      }
      else {
        navigate(`/reports/${newReport.id}`)
      }
    }
    if (formType === 'Update Report') {
      e.preventDefault();
      const patchedReport = await dispatch(thunkUpdateReport(report))
      if (patchedReport.errors) {
        setErrors(patchedReport.errors)
      }
      else {
        navigate(`/reports/${patchedReport.id}`)
      }


    }

  };

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <form onSubmit={handleSubmit}>
      <h2>{formType}</h2>
      <div className="errors">{errors.understanding}</div>
      <label>
        Understanding:
        <input
          type="text"
          value={understanding}
          onChange={(e) => setUnderstanding(e.target.value)}
        />
      </label>
      <div className="errors">{errors.improvement}</div>
      <label>
        Improvement:
        <textarea
          value={improvement}
          onChange={(e) => setImprovement(e.target.value)}
        />
      </label>
      <button type="submit">{formType}</button>
    </form>
  );
};

export default ReportForm;
