import { contactUs } from '@/db/schema';
import { db } from '@/lib/db';
import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message cannot be empty'),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const parseResult = contactFormSchema.safeParse(body);
    if (!parseResult.success) {
      const errors = parseResult.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 422 }
      );
    }
    const { name, email, message } = parseResult.data;
    const [inserted] = await db
      .insert(contactUs)
      .values({ name, email, message })
      .returning({ id: contactUs.id, createdAt: contactUs.createdAt });
    console.log('Saved to DB:', inserted);
    return NextResponse.json(
      {
        message: 'We have received your response.',
        record: inserted,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
