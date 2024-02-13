import { IncomingMessage, ServerResponse } from 'http'
import DB from '@database'
import enablePublicAccess from '@cors'
import { NextApiRequest, NextApiResponse } from 'next'

const allAvos = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    await enablePublicAccess(req as NextApiRequest, res as NextApiResponse)

    const db = new DB()
    const allEntries = await db.getAll()
    const lenght = allEntries.length

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ lenght, data: allEntries }))
  } catch (e) {
    console.error(e)
    res.statusCode = 500
    res.end(
      JSON.stringify({ length: 0, data: [], error: 'Something went wrong' })
    )
  }
}

export default allAvos
