import { action, Action, thunk, Thunk } from "easy-peasy";
import { StoreModel } from "../store";

export interface MainModel {
	// state
	message: string;
	siteTitle: string;

	// actions
	setMessage: Action<this, string>;
	setSiteTitle: Action<this, string>;

	// thunks
	initialize: Thunk<this, void, void, StoreModel>;
}

export const mainModel: MainModel = {
	// state
	message: "",
	siteTitle: "",

	// actions
	setMessage: action((state, message) => {
		state.message = message;
	}),
	setSiteTitle: action((state, siteTitle) => {
		state.siteTitle = siteTitle;
	}),

	// thunks
	initialize: thunk((actions, _, helpers) => {
		const _siteTitle = localStorage.getItem("siteTitle");
		let siteTitle = ""
		if (_siteTitle === null) {
			siteTitle = "Interactive Italian Notes";
		} else {
			siteTitle = JSON.parse(
				localStorage.getItem("siteTitle") || "Interactive Italian Notes"
			);
		}
		actions.setMessage("Welcome to this site.");
		helpers.getStoreActions().flashcardModel.loadFlashcardsThunk();
		helpers.getStoreActions().mainModel.setSiteTitle(siteTitle);
	}),
};
