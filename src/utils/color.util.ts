import { globSync } from 'glob'
import { Colors } from 'discord.js'

export type Color =
	| 'red'
	| 'darkgreen'
	| 'yellow'
	| 'orange'
	| 'luminousvividpink'
	| 'green'
	| 'lightgrey'
	| 'darkgold'
	| 'fuchsia'
	| 'default'
	| 'blue'
	| 'blurple'
	| 'white'
	| 'purple'

export function getHexColor(c: Color): any {
	return Object.entries(Colors).find(([k]) => k.toLowerCase() == c)![1]
}

export function getShulkerIcon(c: Color): string {
	return globSync(`${process.cwd()}/static/${c}.png`)[0]
}