import _rawVerbs from "../../parseddata/verbs.json";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Verb = {
	name: string;
	meaning: string;
	isOpen: boolean;
	isLearned: boolean;
	timesTaken: number
};

const _initialVerbs: Verb[] = [];
for (const verb of _rawVerbs) {
	const initialVerb: Verb = {
		name: verb.name,
		meaning: verb.meaning,
		isOpen: false,
		isLearned: false,
		timesTaken: 0
	};
	_initialVerbs.push(initialVerb);
}

export const PageFlashcards = () => {
	const [verbs, setVerbs] = useLocalStorage<Verb[]>('verbs', _initialVerbs);

	const handleToggleOpen = (verb: Verb) => {
		verb.isOpen = !verb.isOpen;
		if (!verb.isOpen) {
			verb.timesTaken += 1;
		}
		setVerbs([...verbs]);
	}

	const handleToggleLearned = (verb: Verb) => {
		verb.isLearned = !verb.isLearned;
		setVerbs([...verbs]);
	}

	return (
		<div className="pageFlashcards">
			<h2 className="text-xl mb-3">Learned {verbs.filter(verb => verb.isLearned).length} of {verbs.length} Verbs</h2>
			<div className="flex flex-col gap-2 md:flex-column md:w-[21rem]">
				{verbs.map((verb, index) => (
					<div className="verbFlashcard" key={index}>
						{!verb.isLearned && (
							<>
								<div key={index} className={`front ${verb.timesTaken === 0 ? 'notYetTaken' : 'alreadyTaken'} rounded-t py-1 px-2 cursor-pointer select-none items-center flex justify-between`} onClick={() => handleToggleOpen(verb)}>
									<div className="italic">
										{verb.meaning}
									</div>
									{verb.timesTaken !== 0 && (
										<div className="font-mono text-xs text-yellow-100">

											{verb.timesTaken}
										</div>
									)}
								</div>
								{verb.isOpen && (
									<div key={index} className="back italic text-left rounded-b py-1 px-2 flex justify-between items-center">
										<div className="font-semibold">
											{verb.name}
										</div>
										<button className="px-1 bg-blue-600 text-sm text-white rounded hover:bg-blue-700" onClick={() => handleToggleLearned(verb)}>learned</button>
									</div>
								)}
							</>
						)}
					</div>
				))}
			</div>
		</div>
	)
}
