const socket = 'http://10.238.9.13:8000'
const URL = '/api/phishing/daily'

export interface dailyEmail {
    puzzleday: number;
    mail: string;
    sections: {
        uid: string;
        offsetStart: number;
        offsetEnd: number;
    }
    explanation: string;
}

export async function getDaily(): Promise<dailyEmail> {
    const res = await fetch(socket+URL)

    if (!res.ok) {
        throw new Error(`Failed to fetch @${socket+URL}`)
    }

    return res.json()
}
