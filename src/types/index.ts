export type IncomingBody = {
    text: string;
}

export type BingRequestHeader = {
    headers: {
        'Content-Type': string,
        'Content-Length': number,
        'Ocp-Apim-Subscription-Key': string
    }
}

export type Suggestion = {
    suggestion: string;
    score: number;
}

export type FlaggedToken = {
    offset: number;
    token: string;
    type: string;
    suggestions: Suggestion[];
}

export type BingResponse = {
    _type: string;
    flaggedTokens: FlaggedToken[];
    correctionType: string;
}

export type SpellCheckResponse = {
    status: string;
    data: BingResponse[];
}