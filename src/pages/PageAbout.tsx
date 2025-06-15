export const PageAbout = () => {
	return (
		<>
		<p className="mb-3">This site parses my notes on learning Italian to make them interactive for learning exercises.</p>
			<ul className="list-disc ml-6">
				<li>
					Repo:&nbsp;
					<a
						href="https://github.com/edwardtanguay/interitalnotes"
						target="_blank"
						className="underline"
					>
						edwardtanguay/interitalnotes
					</a>
				</li>
				<li>
					Live:&nbsp;
					<a
						href="https://interitalnotes.vercel.app"
						target="_blank"
						className="underline"
					>
						interitalnotes.vercel.app
					</a>
				</li>
			</ul>
		</>
	);
};
