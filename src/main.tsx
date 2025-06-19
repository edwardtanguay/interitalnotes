import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "./index.scss";
import { PageWelcome } from "./pages/PageWelcome.tsx";
import { PageAbout } from "./pages/PageAbout.tsx";
import { Page404 } from "./pages/Page404.tsx";
import { StoreProvider } from 'easy-peasy';
import { store } from './store/store.ts';
import { PageStoryPrompt } from "./pages/PageStoryPrompt.tsx"; //##MARKER:importPageStoryPrompt##
import { PageVerbList } from "./pages/PageVerbList.tsx"; //##MARKER:importPageVerbList##
//##MARKER:importStatementArea##

const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <Page404 />,
		element: <App />,
		children: [
			{
				path: "/welcome",
				element: <PageWelcome />,
			},
			{
				path: "about",
				element: <PageAbout />,
			},
			//##MARKER:routerEntryStoryPrompt.begin##
			{
				path: "story-prompt",
				element: <PageStoryPrompt />,
			},
			//##MARKER:routerEntryStoryPrompt.end##
			//##MARKER:routerEntryVerbList.begin##
			{
				path: "verbList",
				element: <PageVerbList />,
			},
			//##MARKER:routerEntryVerbList.end##
			//##MARKER:routerEntryArea##
			{
				path: "/",
				element: <Navigate to="/welcome" replace />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<StoreProvider store={store}>
		<RouterProvider router={router} />
	</StoreProvider>
);
