import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request: Request) {
  try {
    const { safeAddress, signedTx } = await request.json()
    const safe_url = process.env.NEXT_PUBLIC_BITLAYER_SAFE_URL
    const response = await axios.post(
      `${safe_url}/${safeAddress}/propose`,
      signedTx,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return NextResponse.json(response.data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.response?.status || 500 }
    )
  }
}
