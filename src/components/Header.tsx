import { useTypedStoreState } from "../store/hooks"
import { Nav } from "./Nav";

export const Header = () => {
	const { siteTitle } = useTypedStoreState((state) => state.mainModel);
	return (
		<>
			<h1 className="text-2xl mb-3 text-slate-800">{siteTitle}</h1>
			<Nav />
		</>
	);
};
