
exports.INITIAL_REDUCER_STATE = {
    latitude: 0,
    longitude: 0,
    destionation: null,
    latitudeDelta: 0.0143,
    longitudeDelta: 0.134,
};

exports.reducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state };

        case 'DIRECTIONS':
            const { destionation } = action.payload
            console.log(destionation)
            return { ...state, destionation };

        case 'INSERT_PAGE':
            const { longitude, latitude } = action.payload;
            return {
                ...state,
                ...{ latitude, longitude }
            };

        default:
            return state;
    }
}
