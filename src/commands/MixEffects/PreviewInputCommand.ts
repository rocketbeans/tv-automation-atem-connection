import AbstractCommand from '../AbstractCommand'
import { AtemState } from '../../state'

export class PreviewInputCommand extends AbstractCommand {
	rawName = 'PrvI'
	mixEffect: number

	properties: {
		source: number
	}

	deserialize (rawCommand: Buffer) {
		this.mixEffect = rawCommand[0]
		this.properties = {
			source: rawCommand.readUInt16BE(2)
		}
	}

	serialize () {
		const rawCommand = 'CPvI'
		return new Buffer([
			...Buffer.from(rawCommand),
			this.mixEffect,
			0x00,
			this.properties.source >> 8,
			this.properties.source & 0xFF
		])
	}

	applyToState (state: AtemState) {
		const mixEffect = state.video.getMe(this.mixEffect)
		mixEffect.previewInput = this.properties.source
	}
}
