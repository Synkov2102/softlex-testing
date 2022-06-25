import { createSlice } from "@reduxjs/toolkit";

const popupsSlice = createSlice ({
    name: 'popups',
    initialState: {
        isLoginPopupOpen: false,
        isCreationPopupOpen: false,
        isEditPopupOpen: false,
    },
    reducers: {
        openCreationPopup(state){
            state.isCreationPopupOpen = true
        },
        openLoginPopup(state){
            state.isLoginPopupOpen = true
        },
        openEditPopup(state){
            console.log('edit')
            state.isEditPopupOpen = true
        },
        closeAllPopups(state){
            state.isCreationPopupOpen = false
            state.isLoginPopupOpen = false
            state.isEditPopupOpen = false
        }
    }

})

export const { openCreationPopup, openLoginPopup, openEditPopup, closeAllPopups} = popupsSlice.actions;

export default popupsSlice.reducer;
