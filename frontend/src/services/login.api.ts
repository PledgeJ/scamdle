import type { User } from "../context/UserContext";

const URL = ''

interface Credentials {
    username: string;
    password: string;
}

export async function loginRequest(creds: Credentials ): Promise<User> {
    const res = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(creds)
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to log in')
    }

    return res.json()
}