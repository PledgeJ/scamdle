const socket = 'http://10.238.9.13:8000'
const FETCH_ID_URL = '/api/reqid'

// interface Credentials {
//     username: string;
//     password: string;
// }

// export async function loginRequest(creds: Credentials ): Promise<User> {
//     const res = await fetch(socket + URL, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(creds)
//     })

//     if (!res.ok) {
//         const errorData = await res.json().catch(() => ({}))
//         throw new Error(errorData.message || 'Failed to log in')
//     }

//     return res.json()
// }

interface IDProp {
    id: string
}

export async function requestID(): Promise<IDProp> {
    const res = await fetch(socket+FETCH_ID_URL)

    if (!res.ok) {
      throw new Error(`Failed to fetch @${socket+URL}`)
    }

    return res.json()
}
