import verbs from "../../parseddata/verbs.json";

export const PageVerbList = () => {
	return (
		<>
			<h2 className="text-xl mb-3">{verbs.length} Verbs</h2>
			{verbs.map((verb, index) => (
				<div key={index} className="mb-2">
					<span className="font-bold">{verb}</span>
				</div>
			))}
		</>
	)
}
