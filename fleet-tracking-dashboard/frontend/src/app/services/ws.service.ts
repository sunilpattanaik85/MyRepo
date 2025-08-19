import { Injectable, NgZone } from '@angular/core';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class WsService {
	private client?: Client;
	private connected = false;

	constructor(private zone: NgZone) {}

	connect(): Promise<void> {
		if (this.connected) return Promise.resolve();
		return new Promise((resolve) => {
			this.client = new Client({
				webSocketFactory: () => new SockJS(environment.wsUrl),
				reconnectDelay: 5000,
			});
			this.client.onConnect = () => {
				this.connected = true;
				resolve();
			};
			this.client.onStompError = (frame) => {
				console.error('STOMP error', frame);
			};
			this.client.onWebSocketClose = () => {
				this.connected = false;
			};
			this.client.activate();
		});
	}

	subscribe(topic: string, cb: (msg: IMessage) => void): StompSubscription | undefined {
		if (!this.client || !this.connected) return undefined;
		return this.client.subscribe(topic, (message) => this.zone.run(() => cb(message)));
	}
}