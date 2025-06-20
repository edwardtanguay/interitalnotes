import React from "react";
import _rawVerbs from "../../parseddata/verbs.json";
import { useLocalStorage } from "../hooks/useLocalStorage";

type verbKind = "are" | "ere" | "ire" | "UNKNOWN";

type VerbExample = {
	english: string;
	italian: string;
}

type Verb = {
	name: string;
	meaning: string;
	isOpen: boolean;
	isLearned: boolean;
	timesTaken: number;
	kind: verbKind;
	conjugationUrl: string;
	conjugationNotes: string
	examples: VerbExample[];
};

const getVerbKind = (verbName: string): verbKind => {
	if (verbName.endsWith('are')) return 'are';
	if (verbName.endsWith('ere')) return 'ere';
	if (verbName.endsWith('ire')) return 'ire';
	if (verbName.endsWith('arsi')) return 'are';
	if (verbName.endsWith('ersi')) return 'ere';
	if (verbName.endsWith('irsi')) return 'ire';
	return 'UNKNOWN';
}

const _initialVerbs: Verb[] = [];
for (const _rawVerb of _rawVerbs) {
	const initialVerb: Verb = {
		name: _rawVerb.name,
		meaning: _rawVerb.meaning,
		isOpen: false,
		isLearned: false,
		timesTaken: 0,
		kind: getVerbKind(_rawVerb.name),
		conjugationUrl: `https://conjugator.reverso.net/conjugation-italian-verb-${_rawVerb.name}.html`,
		conjugationNotes: _rawVerb.conjugation_notes || '',
		examples: _rawVerb.examples || []
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
					<React.Fragment key={index}>
						{!verb.isLearned && (
							<div className="verbFlashcard" key={index}>
								<React.Fragment key={index}>
									<div className={`front ${verb.timesTaken === 0 ? 'notYetTaken' : 'alreadyTaken'} rounded-t py-1 px-2 cursor-pointer select-none items-center flex justify-between`} onClick={() => handleToggleOpen(verb)}>
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
										<div className="back text-left rounded-b py-1 px-2 ">
											<div className="flex justify-between items-center">
												<div className="font-semibold">
													{verb.name}
												</div>
												<button className="px-1 uppercase bg-green-900 text-sm text-white rounded hover:bg-green-800" onClick={() => handleToggleLearned(verb)}>learned</button>
											</div>
											{verb.conjugationNotes.trim() !== "" && (
												<div className="section">
													<p>{verb.conjugationNotes}</p>
												</div>
											)}
											{verb.kind === 'are' && (
												<div className="section">
													<p>PRES: -o, -i, -a, -iamo, -ate, -ano</p>
													<p>IMPE: -avo, -avi, -ava, -avamo, -avate, -avano</p>
													<p>PAPR: ho/sono -ato</p>
													<p>FUTU: -erò, -erai, -erà, -eremo, -erete, -eranno</p>
													<p>COND: -erei, -eresti, -erebbe, -eremmo, -ereste, -erebbero</p>
													<p>PARE: -ai, -asti, -ò, -ammo, -aste, -arono</p>
												</div>
											)}
											{verb.kind === 'ere' && (
												<div className="section">
													<p>PRES: -o, -i, -e, -iamo, -ete, -ono</p>
													<p>IMPE: -evo, -evi, -eva, -evamo, -evate, -evano</p>
													<p>PAPR: ho/sono -uto</p>
													<p>FUTU: -erò, -erai, -erà, -eremo, -erete, -eranno</p>
													<p>COND: -erei, -eresti, -erebbe, -eremmo, -ereste, -erebbero</p>
													<p>PARE: -ei, -esti, -é, -emmo, -este, -erono</p>

												</div>
											)}
											{verb.kind === 'ire' && (
												<div className="section">
													<p>PRES: -o, -i, -e, -iamo, -ite, -ono</p>
													<p>IMPE: -ivo, -ivi, -iva, -ivamo, -ivate, -ivano</p>
													<p>PAPR: ho/sono -ito</p>
													<p>FUTU: -irò, -irai, -irà, -iremo, -irete, -iranno</p>
													<p>COND: -irei, -iresti, -irebbe, -iremmo, -ireste, -irebbero</p>
													<p>PARE: -ii, -isti, -ì, -immo, -iste, -irono</p>
												</div>
											)}
											<div className="section">
												<p>Full conjugation: <a href={verb.conjugationUrl} target="_blank" className="text-blue-800 underline">Reverso Conjugator</a></p>
											</div>
											{verb.examples.length > 0 && (
												<div className="section">
													<ul className="list-disc ml-3">
														{verb.examples.map((example, index) => (
															<li key={index} className="mb-1 text-green-900 italic leading-[1.25]">
																{example.italian}
																<ul className="list-disc ml-3">
																	<li className="text-blue-950 opacity-30">
																		{example.english}
																	</li>
																</ul>
															</li>
														))}
													</ul>
												</div>
											)}
										</div>
									)}
								</React.Fragment>
							</div>
						)}
					</React.Fragment>
				))}
			</div >
		</div>
	)
}
