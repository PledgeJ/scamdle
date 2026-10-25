const socket = 'http://127.0.0.1:8000'
const FETCH_URL = '/api/sms/daily'

export interface SMS {
  reason1: string;
  reason2: string | null;
  msg: string;
  isScam: boolean;
}

export interface dailySMS {
    puzzleday: number;
    textData: SMS[];
}

export async function getDailySMS(): Promise<dailySMS> {
    const res = await fetch(socket+FETCH_URL)

    if (!res.ok) {
      throw new Error(`Failed to fetch @${socket+URL}`)
    }

    return res.json()
}
