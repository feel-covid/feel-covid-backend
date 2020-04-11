export enum ConditionEnum {
	LIGHT = 'light',
	MID = 'mid',
	SEVERE = 'severe'
}

export enum StatusCodeEnum {
	BAD_REQUEST = 400,
	NOT_FOUND = 404,
	TOO_MANY_REQUESTS = 429,
	INTERNAL_SERVER_ERROR = 500
}

export enum ErrorMessagesEnum {
	RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED'
}

export enum CachingKeysEnum {
	COUNTRIES_DATA = 'COUNTRIES_DATA'
}
