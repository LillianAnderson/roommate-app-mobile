import axios from '../../lib/customAxios';

const addNotification = notification => (
  (dispatch) => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: notification,
    });
  }
);

const getNotifications = houseId => (
  (dispatch) => {
    axios.get(`api/notifications/${houseId}`)
      .then((notifications) => {
        dispatch({
          type: 'NOTIFICATIONS_RECEIVED',
          payload: notifications.data,
        });
      })
      .catch(err => `FAILED to get notifications: ${err}`);
  }
);

export default {
  addNotification,
  getNotifications,
};
