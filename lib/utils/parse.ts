export const parse = (
	payload: string | null
): Record<string, any> | Array<any> | null => {
	return payload && typeof payload === 'string' ? JSON.parse(payload) : null;
};
