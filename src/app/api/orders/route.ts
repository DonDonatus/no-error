// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'lib/auth';
import prisma from 'lib/prisma';

export async function GET(request: NextRequest) {
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

    // Get all orders for this user or all orders if admin
    const orders = await prisma.order.findMany({
      where: user.role === 'ADMIN' 
        ? {} 
        : { userId: user.id },
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ 
      success: true, 
      orders 
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch orders'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
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

    // Validate order data
    if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Order must contain at least one item'
      }, { status: 400 });
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
    
    // Calculate total amount
    const totalAmount = data.items.reduce((sum: number, item: any) => 
      sum + (parseFloat(item.price) * (item.quantity || 1)), 0);

    // Create the order with nested items
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        orderNumber,
        totalAmount,
        status: 'PENDING',
        items: {
          create: data.items.map((item: any) => ({
            name: item.name,
            description: item.description,
            price: parseFloat(item.price),
            quantity: item.quantity || 1,
          }))
        },
        deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : null,
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({
      success: true,
      order,
      message: 'Order created successfully'
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create order'
    }, { status: 500 });
  }
}