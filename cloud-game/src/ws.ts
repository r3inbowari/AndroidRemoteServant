import { ComponentInternalInstance } from 'vue'

export class IWebSocket {
	// timer tag
	wsHeartbeatTag: number = 0
	// interval heartbeat
	ttlHeartbeat: number = 60 * 1000
	// root instance
	componentInstance: ComponentInternalInstance | null = null
	// hostname
	mHost: string | null = null

	pingMsg: string = 'ping'

	constructor(currentInstance: ComponentInternalInstance | null, host: string | null) {
		// check instance
		if (currentInstance === null) {
			console.error("can not read component internal instance: null");
			return
		}

		if (host !== null) {
			this.mHost = host
		}
		this.componentInstance = currentInstance
	}

	// init ws and connect
	// currentInstance: ComponentInternalInstance | null
	initMsgWebsocket() {

		// connect manually
		// @callback onerror may be call
		if (this.mHost === null) {
			this.componentInstance?.appContext.config.globalProperties.$connect()
		} else {
			this.componentInstance?.appContext.config.globalProperties.$connect(this.mHost)
		}

		// 消息接收
		(this.componentInstance?.appContext.config.globalProperties.sockets).onmessage = (res: {
			data: string
		}) => {
			// msg case
			console.log('[ws] ' + res.data)
		}

		// error handler
		(this.componentInstance?.appContext.config.globalProperties.sockets).onerror = () => {
			console.log('[ws] error found')
		}

		// connection open
		(this.componentInstance?.appContext.config.globalProperties.sockets).onopen = () => {
			console.log('[ws] websocket connected')
			this.wsHeartbeat(this.ttlHeartbeat)
		}

		// connection close
		(this.componentInstance?.appContext.config.globalProperties.sockets).onclose = () => {
			console.log('[ws] close')
			console.log('[ws] clear interval ', this.wsHeartbeatTag)
			clearInterval(this.wsHeartbeatTag)
			this.wsHeartbeatTag = 0
		}
	}

	// heartbear function
	wsHeartbeat(heardbeatInterval: number) {
		this.wsHeartbeatTag = setInterval(() => {
			if (
				this.componentInstance?.appContext.config.globalProperties.$socket
					.readyState === 1
			) {
				this.componentInstance?.appContext.config.globalProperties.$socket.send(
					this.pingMsg
				)
			} else {
				console.log('[ws] socket not created')
			}
		}, heardbeatInterval)
	}

	// send
	send(payload: object) {
		let jsonPayload = JSON.stringify(payload)
		if (this.componentInstance?.appContext.config.globalProperties.$socket
			.readyState === 1) {
			this.componentInstance?.appContext.config.globalProperties.$socket.send(
				jsonPayload
			)
		}
	}
}