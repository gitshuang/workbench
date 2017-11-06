const tablist = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TABS':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          url: action.url,
        },
      ];
    default:
      return state;
  }
};

export default tablist;
