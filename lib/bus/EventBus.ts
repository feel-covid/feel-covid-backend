import { EventEmitter } from 'events';

enum EVENTS {
	STAT_ADDED = 'STAT_ADDED'
}

export class EventBus extends EventEmitter {
	static EVENTS = EVENTS;
}
