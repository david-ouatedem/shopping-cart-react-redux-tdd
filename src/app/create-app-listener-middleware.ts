import {createListenerMiddleware} from "@reduxjs/toolkit";
import {AppDispatch, Dependencies, RootState} from "./create-store.ts";

export const createAppListenerMiddleware = () =>
    createListenerMiddleware<RootState, AppDispatch, Dependencies>();