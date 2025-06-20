/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useTypedStoreActions } from "../store/hooks"
import { useNavigate } from "react-router-dom";

export const PageSettings = () => {
	const [firstName, setFirstName] = useLocalStorage<string>('firstName', '');
	const { setSiteTitle } = useTypedStoreActions((actions) => actions.mainModel);
	const navigate = useNavigate();

	const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const firstName = e.target.value;
		setFirstName(firstName);
		let siteTitle = "";
		if (firstName.trim() === '') {
			siteTitle = "Interactive Italian Notes";
		} else {
			siteTitle = `${firstName}'s Italian Site`;
		}
		setSiteTitle(siteTitle);
		localStorage.setItem('siteTitle', JSON.stringify(siteTitle));
	};

	const handleResetFlashcardHistory = () => {
		localStorage.removeItem('verbs');
		navigate("/flashcards");
	};

	return (
		<div className="flex flex-col gap-4">
			<div>
				<h2 className="text-xl mb-1">Personalize this site:</h2>
				<label>
					First Name:{" "}
					<input
						type="text"
						value={firstName}
						onChange={handleFirstNameChange}
						className="border px-1 py-0.5 rounded text-sm w-32"
					/>
				</label>
			</div>
			<div>
				<h2 className="text-xl mb-1">Clear Flashcard History:</h2>
				<button
					className="px-2 py-1 bg-red-500 text-sm text-white rounded hover:bg-red-600"
					onClick={handleResetFlashcardHistory}
				>
					Reset flashcard history now
				</button>
			</div>
		</div>
	)
}
