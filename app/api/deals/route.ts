import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET() {
  try {
    // Get the data directory path
    const dataDir = path.join(process.cwd(), 'data')
    
    // Read all files in the data directory
    const files = await fs.readdir(dataDir)
    
    // Find the most recent top deals file
    const topDealsFile = files
      .filter(f => f.startsWith('top_deals_'))
      .sort()
      .reverse()[0]
    
    if (!topDealsFile) {
      return NextResponse.json({ deals: [] })
    }
    
    // Read and parse the deals
    const dealsData = await fs.readFile(
      path.join(dataDir, topDealsFile),
      'utf-8'
    )
    const deals = JSON.parse(dealsData)
    
    return NextResponse.json({ deals })
  } catch (error) {
    console.error('Error fetching deals:', error)
    return NextResponse.json(
      { error: 'Failed to fetch deals' },
      { status: 500 }
    )
  }
} 