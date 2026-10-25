const socket = 'http://127.0.0.1:8000'
const FETCH_URL = '/api/phishing/daily'

const CHECK_URL = '/api/phishing/submit/'

export interface Section {
    id: string;
    start: number;
    end: number;
}

// First 2 sections are ALWAYS source address and then header
export interface dailyEmail {
  puzzleday: number;
  mail: string;
  sections: Section[]
}

export async function getDaily(): Promise<dailyEmail> {
    const res = await fetch(socket+FETCH_URL)

    if (!res.ok) {
      throw new Error(`Failed to fetch @${socket+URL}`)
    }

    return res.json()
}

export interface SectionCheck {
    correct: boolean;
    explanation: string | null;
    done: boolean;
}

export async function checkSection(sectionID: string, userID: string): Promise<SectionCheck> {
  const res = await fetch(socket+CHECK_URL+`${sectionID}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        'X-Player-Id': JSON.stringify(userID),
    },
    body: JSON.stringify(sectionID)
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to check section')
  }

  return res.json()
}
