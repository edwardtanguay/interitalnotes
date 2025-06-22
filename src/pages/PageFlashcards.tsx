import React from "react";
import _rawVerbs from "../../parseddata/verbs.json";
import { useLocalStorage } from "../hooks/useLocalStorage";
import * as config from "../config";

type verbKind = "are" | "ere" | "ire" | "UNKNOWN";

type VerbExample = {
	english: string;
	italian: string;
	isOpen: boolean;
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
	prompt: string;
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
		examples: _rawVerb.examples.map(m => ({ ...m, isOpen: false })) || [],
		prompt: `8 examples of the Italian verb "${_rawVerb.name}", one of these tenses per example (presente, imperfetto, passato remoto, futuro semplice, passato prossimo, condizionale presente, gerundio presente, imperativo), one of these personal pronouns per example (io, tu, lui, lei, Lei, noi, voi, loro) with Italian and English in the form "<italian> ; <english>", don't number them, and start with lowercase if grammatically correct (e.g. leave "I" capitalized at beginning of an English sentence), 9 Italian words max, at begging of  the English phrase, note which past tense is used, e.g. with (passato remoto), (imperfetto), (passato prossimo), randomize the order of the tenses, e.g. sometimes start with passato remoto, sometimes with futuro semplice, etc.`
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

	const handleExampleToggleOpen = (example: VerbExample) => {
		example.isOpen = !example.isOpen;
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
											{verb.meaning} {verb.examples.length >= 8 && (<span className="not-italic">🚀</span>)}
										</div>
										{verb.timesTaken !== 0 && (
											<div className="font-mono text-xs text-yellow-100">
												{verb.timesTaken}
											</div>
										)}
									</div>
									{verb.isOpen && (
										<div className="back text-left rounded-b py-1 px-2 ">
											<div className="flex justify-center items-center">
												<div className="font-semibold text-[1.3rem]">
													{verb.name}
												</div>
											</div>
											{verb.conjugationNotes.trim() !== "" && (
												<div className="section">
													<p className="italic opacity-50">(special conjugation)</p>
													<p>{verb.conjugationNotes}</p>
												</div>
											)}
											{verb.kind === 'are' && (
												<div className="section">
													<p className="italic opacity-50">(regular conjugation)</p>
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
											<div className="section text-center">
												<p className="text-[.9rem]">Full conjugation: <a href={verb.conjugationUrl} target="_blank" className="text-blue-800 underline">Reverso Conjugator</a></p>
											</div>
											{verb.examples.length > 0 && (
												<div className="section flex gap-1 flex-col">
													{verb.examples.map((example, index) => (
														<div className="exampleCard text-[1rem]" key={index}>
															<div className="exampleFront rounded-t py-1 px-2 cursor-pointer select-none bg-slate-600 italic text-slate-100 text-[.8rem]"
																onClick={() => handleExampleToggleOpen(example)}>
																{example.english}</div>
															{example.isOpen && (
																<div className="exampleBack rounded-b py-1 px-2 cursor-pointer select-none bg-slate-900 text-green-400">{example.italian}</div>
															)}
														</div>
													))}
												</div>
											)}
											{config.siteIsLocal() && verb.examples.length < 8 && (
												<div className="section">
													<textarea
														spellCheck="false"
														autoCorrect="off"
														autoCapitalize="off"
														readOnly
														className="w-full h-24 p-2 bg-gray-100 rounded border border-gray-300 font-mono" value={verb.prompt} />
												</div>
											)}
											<div className="section flex justify-between items-center !pt-3">
												<button className="px-1 uppercase bg-red-900 text-sm text-white rounded hover:bg-red-800" onClick={() => handleToggleOpen(verb)}>test again later</button>
												<button className="px-1 uppercase bg-green-900 text-sm text-white rounded hover:bg-green-800" onClick={() => handleToggleLearned(verb)}>learned</button>
											</div>
										</div>
									)}
								</React.Fragment>
							</div>
						)}
					</React.Fragment>
				))
				}
			</div >
		</div >
	)
}
