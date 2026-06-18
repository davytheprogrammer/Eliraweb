import { NextRequest, NextResponse } from 'next/server';
import { approveExpert } from '@/lib/db/queries';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await approveExpert(id);
    return NextResponse.json({ success: true, message: 'Expert approved successfully' });
  } catch (error) {
    console.error('Approve Expert Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
