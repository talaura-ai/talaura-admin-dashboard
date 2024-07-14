import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IInviteCandidateItem } from '../../components/AssessmentView/types';

const initialState: IInviteCandidateItem[] = [];

export const inviteCandidateSlice = createSlice({
  name: 'inviteCandidate',
  initialState,
  reducers: {
    addCandidateToInviteList: (state, action: PayloadAction<IInviteCandidateItem>) => {
      return state.concat(action.payload);
    },
    removeCandidateFromInviteList: (state, action: PayloadAction<string>) => {
      return state.filter((candidate) => candidate.email !== action.payload);
    },
    clearInviteList: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { addCandidateToInviteList, clearInviteList, removeCandidateFromInviteList } =
  inviteCandidateSlice.actions;

export default inviteCandidateSlice.reducer;
