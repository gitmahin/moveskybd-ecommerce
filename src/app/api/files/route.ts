import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
  const data = await req.arrayBuffer()
  const buffer = Buffer.from(data)
  console.log(buffer)
  return NextResponse.json({data})

}