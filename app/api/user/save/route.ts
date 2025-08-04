import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/config/db';
import { Users } from '@/config/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const { userEmail, userImage, userName } = await request.json();

    if (!userEmail) {
      return NextResponse.json(
        { error: 'User email is required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(Users)
      .where(eq(Users.userEmail, userEmail));

    if (existingUser.length > 0) {
      // User exists, return existing user data
      return NextResponse.json({
        message: 'User already exists',
        user: existingUser[0]
      });
    }

    // Create new user
    const newUser = await db
      .insert(Users)
      .values({
        userEmail,
        userImage,
        userName,
      })
      .returning({
        userEmail: Users.userEmail,
        userName: Users.userName,
        userImage: Users.userImage,
        credit: Users.credit,
      });

    return NextResponse.json({
      message: 'User created successfully',
      user: newUser[0]
    });

  } catch (error) {
    console.error('Error saving user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
