const GET_ITEM = 'GET_ITEM'


let initialState = {
    currentItem:[]
}

export const item_reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ITEM:
            return {...state, currentItem: action.itemData}
    }
    return state
}

export const getItemCreator = (itemData) => ({
    type: GET_ITEM,
    itemData
})
