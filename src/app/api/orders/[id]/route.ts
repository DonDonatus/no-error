// app/api/orders/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'lib/auth';
import {prisma} from 'lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 });
    }

    // Get the order
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        items: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
      },
    });

    if (!order) {
      return NextResponse.json({
        success: false,
        error: 'Order not found'
      }, { status: 404 });
    }

    // Check if user has permission to see this order
    if (user.role !== 'ADMIN' && order.userId !== user.id) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized to view this order'
      }, { status: 403 });
    }

    return NextResponse.json({ 
      success: true, 
      order 
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching order details:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch order details'
    }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 });
    }

    // Check if user is admin or tailor (only they can update order status)
    if (user.role !== 'ADMIN' && user.role !== 'TAILOR') {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized to update orders'
      }, { status: 403 });
    }

    // Update the order
    const updatedOrder = await prisma.order.update({
      where: { id: params.id },
      data: {
        status: data.status,
        deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : undefined,
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({
      success: true,
      order: updatedOrder,
      message: 'Order updated successfully'
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update order'
    }, { status: 500 });
  }
}