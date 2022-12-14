//Used for neatness and clairity so you know that its not just any string
type HexColor = string;

//All the users style data
// eslint-disable-next-line prefer-const
export let styleData: {
	id: string;
	font: string;
	fontColor: HexColor;
	fontOpacity: number;
	size: number;
	dropshadowColor: HexColor;
	dropshadowDistance: number;
	backgroundColor: HexColor;
	backgroundOpacity: number;
	bold: boolean;
	italics: boolean;
	underline: boolean;
}[] = [];
//This is the style that they are currently editing.
// eslint-disable-next-line prefer-const
export let selectedStyle = 1;

//Font dictionary taken from: https://github.com/arcusmaximus/YTSubConverter/blob/3455abe39138348283bc12f9ad2f5b94e2115e61/YTSubConverter/Formats/YttDocument.cs#L1173
export const fontDictionary = {
	'-1': 'Default',
	1: 'Courier New', //works
	2: 'Times New Roman', //works
	3: 'Lucida Console', // Because of the incorrect "Deja Vu Sans Mono" font name in YouTube's captions.js, browsers fall back to this second option
	5: 'Comic Sans Ms', // works
	6: 'Monotype Corsiva', //seems to not work
	7: 'Carrois Gothic Sc',
	_: 'Roboto'
};

//Unused, might be used later if we add position support
export const positionDictornary = {
	BottomLeft: 1,
	BottomCenter: 2,
	BottomRight: 3,
	MiddleLeft: 4,
	Center: 5,
	MiddleRight: 6,
	TopLeft: 7,
	TopCenter: 8,
	TopRight: 9
};

//all the styles that can be applied and what input type they will need to be modified along with some perams
const styleTypes = {
	backgroundColor: 'color',
	backgroundOpacity: 'numberRanged 0-255',
	color: 'color',
	italics: 'boolean',
	bold: 'boolean',
	underline: 'boolean',
	font: 'dropdown ' + JSON.stringify(fontDictionary),
	size: 'number 100',
	fontOpacity: 'numberRanged 0-255',
	'Dropshadow Color': 'color',
	'Dropshadow Distance': 'numberRanged 1-4'
};
//This is a table for convering the data into the correct varible names for youtube
export const styleToXML = {
	backgroundColor: 'bc',
	backgroundOpacity: 'bo',
	color: 'fc',
	italics: 'i',
	bold: 'b',
	underline: 'u',
	font: 'fs',
	size: 'sz',
	fontOpacity: 'fo',
	id: 'id',
	'Dropshadow Color': 'ec',
	'Dropshadow Distance': 'et'
};

//This is used for the preview
export const stylePreview = {
	backgroundColor: {
		cssName: 'background-color',
		value: 'INPUT',
		effectedElement: 'previewText'
	},
	backgroundOpacity: {
		cssName: 'btraparency',
		value: 'INPUT',
		effectedElement: 'previewText'
	},
	color: { cssName: 'color', value: 'INPUT', effectedElement: 'previewText' },
	italics: {
		cssName: 'font-style',
		value: `INPUT == 1 ? "italic" : "normal"`,
		effectedElement: 'previewText'
	},
	bold: {
		cssName: 'font-weight',
		value: `INPUT == 1 ? "bold" : "normal"`,
		effectedElement: 'previewText'
	},
	underline: {
		cssName: 'text-decoration',
		value: `INPUT == 1 ? "underline" : "normal"`,
		effectedElement: 'previewText'
	},
	font: {
		cssName: 'font-family',
		value: 'fontDictionary[INPUT]',
		effectedElement: 'previewText'
	},
	size: {
		cssName: 'font-size',
		value: 'INPUT%',
		effectedElement: 'previewText'
	},

	fontOpacity: {
		cssName: 'traparency',
		value: 'INPUT',
		effectedElement: 'previewText'
	},
	id: null,
	'Dropshadow Color': {
		cssName: 'text-shadow',
		value: 'INPUT',
		effectedElement: 'previewText'
	},
	'Dropshadow Distance': {
		cssName: 'text-shadow',
		value: 'INPUT',
		effectedElement: 'previewText'
	}
};
