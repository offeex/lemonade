import Button from '../../../structures/Button'
import {
	getTicket,
	getTicketContent,
	ticketStage,
} from '../../../managers/ticket.manager'
import { resolveInteractionUpdate } from '../../../utils/discord.util'

export default new Button('ticket-reset-kits', async interaction => {
	await resolveInteractionUpdate(interaction)

	const t = await getTicket(interaction)
	if (t.kits.length !== 0) {
		t.kits = []
		const ts = ticketStage(t)
		await ts.create!.edit({ content: getTicketContent(t) })
	}
})
