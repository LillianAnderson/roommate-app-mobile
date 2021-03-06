const initialState = {
  username: '',
  id: 0,
  imageUrl: 'https://t3.ftcdn.net/jpg/00/64/67/52/240_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg',
  firstName: '',
  lastName: '',
  phone: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER': {
      if (!action.user.imageUrl) {
        action.user.imageUrl = initialState.imageUrl;
      }
      return { ...state, ...action.user };
    }

    case 'RESET_USER':
      return { ...state, ...initialState };

    default: {
      return state;
    }
  }
};

export default userReducer;
