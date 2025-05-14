// app/api/user/measurements/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from 'lib/auth';
import { prisma} from 'lib/prisma';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        measurements: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const latest = user.measurements[0] || {};

    return NextResponse.json({
      success: true,
      measurements: {
        chest: latest.chest?.toString() || '',
        neck: latest.neck?.toString() || '',
        trouserLength: latest.outseam?.toString() || '',
        shoulderWidth: latest.shoulder?.toString() || '',
        trouserWaist: latest.waist?.toString() || '',
        armLength: latest.inseam?.toString() || '',
        hipCircumference: latest.hip?.toString() || '',
        sleeveLength: latest.sleeveLength?.toString() || '',
      },
    });
  } catch (error) {
    console.error('Error fetching measurements:', error);
    return NextResponse.json({ error: 'Failed to fetch measurements' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const existing = await prisma.measurement.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    const updated = await prisma.measurement.upsert({
      where: { id: existing?.id ?? '000000000000000000000000' }, // dummy ID if none exists
      update: {
        chest: data.chest ? parseFloat(data.chest) : null,
        neck: data.neck ? parseFloat(data.neck) : null,
        waist: data.trouserWaist ? parseFloat(data.trouserWaist) : null,
        hip: data.hipCircumference ? parseFloat(data.hipCircumference) : null,
        shoulder: data.shoulderWidth ? parseFloat(data.shoulderWidth) : null,
        outseam: data.trouserLength ? parseFloat(data.trouserLength) : null,
        sleeveLength: data.sleeveLength ? parseFloat(data.sleeveLength) : null,
        inseam: data.armLength ? parseFloat(data.armLength) : null,
      },
      create: {
        userId: user.id,
        chest: data.chest ? parseFloat(data.chest) : null,
        neck: data.neck ? parseFloat(data.neck) : null,
        waist: data.trouserWaist ? parseFloat(data.trouserWaist) : null,
        hip: data.hipCircumference ? parseFloat(data.hipCircumference) : null,
        shoulder: data.shoulderWidth ? parseFloat(data.shoulderWidth) : null,
        outseam: data.trouserLength ? parseFloat(data.trouserLength) : null,
        sleeveLength: data.sleeveLength ? parseFloat(data.sleeveLength) : null,
        inseam: data.armLength ? parseFloat(data.armLength) : null,
      },
    });

    return NextResponse.json({
      success: true,
      measurements: {
        chest: updated.chest?.toString() || '',
        neck: updated.neck?.toString() || '',
        trouserLength: updated.outseam?.toString() || '',
        shoulderWidth: updated.shoulder?.toString() || '',
        trouserWaist: updated.waist?.toString() || '',
        armLength: updated.inseam?.toString() || '',
        hipCircumference: updated.hip?.toString() || '',
        sleeveLength: updated.sleeveLength?.toString() || '',
      },
    });
  } catch (error) {
    console.error('Error saving measurements:', error);
    return NextResponse.json({ error: 'Failed to save measurements' }, { status: 500 });
  }
}
