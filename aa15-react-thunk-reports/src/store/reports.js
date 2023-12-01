import { createSelector } from 'reselect'

/** Action Type Constants: */
export const LOAD_REPORTS = 'reports/LOAD_REPORTS';
export const RECEIVE_REPORT = 'reports/RECEIVE_REPORT';
export const UPDATE_REPORT = 'reports/UPDATE_REPORT';
export const REMOVE_REPORT = 'reports/REMOVE_REPORT';

/**  Action Creators: */
export const loadReports = (reports) => ({
  type: LOAD_REPORTS,
  reports
});

export const receiveReport = (report) => ({
  type: RECEIVE_REPORT,
  report
});

export const editReport = (report) => ({
  type: UPDATE_REPORT,
  report
});

export const removeReport = (reportId) => ({
  type: REMOVE_REPORT,
  reportId
});

/** Thunk Action Creators: */

export const thunkAllReports = () => async (dispatch) => {
  const results = await fetch('/api/reports')
  const reports = await results.json()
  if (results.ok) dispatch(loadReports(reports))
  return reports
}

export const thunkReportDelete = (reportId) => async (dispatch) => {
  const results = await fetch(`/api/reports/${reportId}`, {
    method: 'DELETE'
  })
  if (results.ok) {
    const data = await results.json();
    dispatch(removeReport(reportId))
    return data;
  }
}

export const thunkReceiveReport = (reportId) => async (dispatch) => {
  const report = await fetch(`/api/reports/${reportId}`)
  if (report.ok) {
    const data = await report.json();
    dispatch(receiveReport(data));
    return data;
  }
}

export const thunkCreateReport = (report) => async (dispatch) => {
  const reportFetch = await fetch(`/api/reports`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(report)
  })
  if (reportFetch.ok) {
    const data = await reportFetch.json();
    dispatch(receiveReport(data))
    return data
  }
  else {
    console.log(reportFetch)
    const returnReport = await reportFetch.json();
    return returnReport
  }
}

export const thunkUpdateReport = (report) => async (dispatch) => {
  const updatedReport = await fetch(`/api/reports/${report.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(report)
  })
  if (updatedReport.ok) {
    const data = updatedReport.json();
    dispatch(editReport(data))
    return data
  }
  else {
    const errorReport = updatedReport.json();
    return errorReport
  }
}

// Your code here

/** Selectors: */
const reportSelector = (state) => state.reports
export const reportsArray = createSelector(reportSelector, (reports) => Object.values(reports))
/** Reducer: */

/** The reports reducer is complete and does not need to be modified */
const reportsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_REPORTS: {
      const reportsState = {};
      action.reports.forEach((report) => {
        reportsState[report.id] = report;
      });
      return reportsState;
    }
    case RECEIVE_REPORT:
      return { ...state, [action.report.id]: action.report };
    case UPDATE_REPORT:
      return { ...state, [action.report.id]: action.report };
    case REMOVE_REPORT: {
      const newState = { ...state };
      delete newState[action.reportId];
      return newState;
    }
    default:
      return state;
  }
};

export default reportsReducer;
