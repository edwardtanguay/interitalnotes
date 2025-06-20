import { useState } from "react";
import _rawVerbs from "../../parseddata/verbs.json";

type Verb = {
	name: string;
	meaning: string;
	isOpen: boolean;
	isLearned: boolean;
};

const initialVerbs: Verb[] = [];
for (const verb of _rawVerbs) {
	const initialVerb: Verb = {
		name: verb.name,
		meaning: verb.meaning,
		isOpen: false,
		isLearned: false,
	};
	initialVerbs.push(initialVerb);
}

export const PageFlashcards = () => {
	const [verbs, setVerbs] = useState<Verb[]>(initialVerbs);

	const handleToggleOpen = (verb: Verb) => {
		verb.isOpen = !verb.isOpen;
		setVerbs([...verbs]);
	}

	const handleToggleLearned = (verb: Verb) => {
		verb.isLearned = !verb.isLearned;
		setVerbs([...verbs]);
	}

	return (
		<>
			<h2 className="text-xl mb-3">Learned {verbs.filter(verb => verb.isLearned).length} of {verbs.length} Verbs</h2>
			<div className="flex flex-col gap-2 md:flex-column md:w-[21rem]">
				{verbs.map((verb, index) => (
					<>
						{!verb.isLearned && (
							<div key={index}>
								<div key={index} className="bg-orange-300 italic rounded-t py-1 px-2 cursor-pointer select-none" onClick={() => handleToggleOpen(verb)}>{verb.meaning}</div>
								{verb.isOpen && (
									<div key={index} className="bg-green-300 italic text-left rounded-b py-1 px-2 flex justify-between items-center">
										<div className="font-semibold">
											{verb.name}
										</div>
										<button className="px-1 bg-blue-600 text-sm text-white rounded hover:bg-blue-700" onClick={() => handleToggleLearned(verb)}>learned</button>
									</div>
								)}
							</div>
						)}
					</>
				))}
			</div>
		</>
	)
}
