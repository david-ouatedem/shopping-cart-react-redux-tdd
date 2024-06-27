import React from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import {RouterProvider} from "react-router-dom";
import {router} from "./Router";
import {Provider} from "react-redux";
import {appStore,persist} from "./app/create-store.ts";
import {PersistGate} from "redux-persist/integration/react";

const domNode = document.getElementById("root");
const root = createRoot(domNode!);


root.render(
    <React.StrictMode>
        <Provider store={appStore}>
            <PersistGate persistor={persist}>
                <RouterProvider router={router(appStore)}/>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
