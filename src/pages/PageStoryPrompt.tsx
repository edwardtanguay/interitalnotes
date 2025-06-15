import _verbs from "../../parseddata/verbs.json";
import * as tools from "../tools";

export const PageStoryPrompt = () => {
	const numberOfVerbs = 50;
	const verbs = tools.getRandomSubset(_verbs, numberOfVerbs);
	const verbList = verbs.join(", ");
	const prompt =
		"Create a title (first letter uppercase, the rest lowercase) and then a story about any topic, in B1 Italian, with 550 words varying the tenses past, present, conditional and future, using all of the following 50 words: " +
		verbList;

	return (
		<>
			<p>
				Chose {numberOfVerbs} random verbs from {_verbs.length} total
				verbs.
			</p>
			<p className="pb-3">Reload to reshuffle.</p>
			<p className="pb-2">
				Copy the following text, paste it in your favoriate LLM, and
				copy the resulting story into your&nbsp;
				<a
					href="https://comprehensible-output.vercel.app"
					target="_blank"
					className="underline"
				>
					Comprehensible Output
				</a>{" "}
				site:
			</p>
			<textarea
				className="w-full h-[30rem] md:h-64 p-2"
				value={prompt}
				readOnly
			></textarea>
		</>
	);
};
