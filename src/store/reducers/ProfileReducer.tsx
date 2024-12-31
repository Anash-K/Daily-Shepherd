// import {createAction, createReducer} from '@reduxjs/toolkit';

// const initialState = {
//   name: '',
//   profile: '',
// };

// const UPDATE_PROFILE_INFO = 'profileInfo/updateProfileInfo';
// const UPDATE_NAME = 'profileInfo/updateName';

// export const updateProfileInfo = createAction(
//   UPDATE_PROFILE_INFO,
//   userData => ({
//     payload: {userData},
//   }),
// );

// export const update_UserName = createAction(UPDATE_NAME, userName => ({
//   payload: {userName},
// }));

// const profileReducer = createReducer(initialState, builder => {
//   builder
//     .addCase(updateProfileInfo, (state, action) => {
//       state.profile = action.payload.userData.profile;
//       state.name = action.payload.userData.name;
//     })
//     .addCase(update_UserName, (state, action) => {
//       state.name = action.payload.userName;
//     });
// });


// export default profileReducer;