import axios, { AxiosResponse } from "axios";
import { BingRequestHeader, BingResponse } from "../types";
import dotenv from 'dotenv';
dotenv.config();

const MAX_LENGTH_OF_URL = 2048;

export class BingSpellCheck {
    text: string;
    key: string;
    constructor(text:string) {
        this.text = text;
        this.key = process.env['BING_KEY'] ?? "";
    }

    /**
     * Generates an url for BING
     * @returns {string}
     */
    getUrl() {
        const base = "https://api.bing.microsoft.com";
        const path = "/v7.0/spellcheck";
        const language = "fi-FI";
        const mode = "spell";
        const query = `?text=${this.text}&mode=${mode}&mkt=${language}`;
        return `${base}${path}${query}`;
    }

    /**
     * Chunks text to max length of 2048
     * @returns {string[]}
     */
    checkTextLength():string[] {
        if (this.text.length > MAX_LENGTH_OF_URL) {
            const chunks = this.text.match(/.{1,2048}/g);
            if (chunks) {
                return chunks;
            }
        }
        return [this.text];
    }

    /**
     * Creates an request header
     * @param text 
     * @returns {}
     */
    createRequestHeader(text:string):BingRequestHeader {
        return {
            headers : {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Content-Length' : text.length + 5,
               'Ocp-Apim-Subscription-Key' : this.key,
            }
        }
    }

    /**
     * Makes an request to BING
     * @param text 
     * @returns 
     */
    async request(text:string):Promise<null | BingResponse> {
        const url = this.getUrl();
        const header = this.createRequestHeader(text);
        const request = await axios.get(url, header) as AxiosResponse<BingResponse>;
        if (request.status === 200) {
            return request.data;
        }
        return null;
    }

    /**
     * Chunks an text and checks it in bing
     */
    async spellCheck():Promise<BingResponse[]> {
        let results:BingResponse[] = [];
        const textChunks = this.checkTextLength();
        for (const text of textChunks) {
            const query = await this.request(text);
            if (query) {
                results.push(query);
            }
        }
        return results;
    }
}