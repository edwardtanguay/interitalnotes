export const siteIsLocal = (): boolean => {
	return import.meta.env.VITE_SITE_LOCATION === "local";
};
