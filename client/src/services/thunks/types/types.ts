import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';

export type AppThunkDispatch = ThunkDispatch<unknown, unknown, UnknownAction>