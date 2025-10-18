import { NextResponse } from 'next/server'

export async function GET() {
  try {
    return NextResponse.json({ message: 'API de test fonctionne !', timestamp: new Date().toISOString() })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur dans l\'API de test' }, { status: 500 })
  }
}






