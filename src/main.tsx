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
import { PageFlashcards } from "./pages/PageFlashcards.tsx"; //##MARKER:importPageVerbList##
import { PageSettings } from "./pages/PageSettings.tsx"; //##MARKER:importPageSettings##
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
				path: "flashcards",
				element: <PageFlashcards />,
			},
			//##MARKER:routerEntryVerbList.end##
			//##MARKER:routerEntrySettings.begin##
			{
				path: "settings",
				element: <PageSettings />,
			},
			//##MARKER:routerEntrySettings.end##
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
