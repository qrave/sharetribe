import axios from 'axios';
import * as actionTypes from './constants';

export const EDIT_VIEW_OPEN_HASH = 'manage-working-hours';

export const openEditView = () => ({ type: actionTypes.OPEN_EDIT_VIEW });

export const closeEditView = () => ({ type: actionTypes.CLOSE_EDIT_VIEW });

const startSaving = () => ({ type: actionTypes.START_SAVING });

const changesSaved = () => ({ type: actionTypes.CHANGES_SAVED });

const savingFailed = (e) => ({
  type: actionTypes.SAVING_FAILED,
  error: true,
  payload: e,
});

const dataLoaded = (data) => ({
  type: actionTypes.DATA_LOADED,
  payload: data,
});

export const dataChanged = () => ({ type: actionTypes.DATA_CHANGED });

export const saveChanges = (formData) =>
  (dispatch, getState) => {
    dispatch(startSaving());
    const state = getState().listingWorkingHours;
    const listingId = state.get('listing').id; // eslint-disable-line no-unused-vars
    console.log('save Listing Working Hours Changes'); // eslint-disable-line
    axios.post(`/int_api/listings/${listingId}/update_working_time_slots`, formData)
    .then((response) => {
      dispatch(changesSaved());
      dispatch(dataLoaded(response.data));
      console.log(response); // eslint-disable-line no-console

      /*
      this.setState({ // eslint-disable-line react/no-set-state
        timeSlots: response.data.working_time_slots,
        saveInProgress: false,
        saveFinished: true,
      });
      */
    })
    .catch((error) => {
      savingFailed(error);
      console.log(error); // eslint-disable-line no-console
    });

  };
