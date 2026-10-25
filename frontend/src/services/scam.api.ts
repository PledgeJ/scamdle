const socket = 'http://10.238.9.13:8000'
const URL = '/api/whichscam/verify'

export interface Scam{
    puzzleday: string;
    correctscam: false;
    desc: string;
    unexpected: boolean;
    urgency: boolean;
    impersonation: boolean;
    unusualPayment: boolean;
    toogood: boolean;
}

export async function checkRow(name: string ): Promise<Scam> {
    const res = await fetch(socket + URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({guess: name})
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to log in')
    }

    return res.json()
}