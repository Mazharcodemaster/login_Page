import { prisma } from '@/db/config';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcrypt';

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Please fill all fields' }, { status: 400 });
    }

    const existingUser = await prisma.signUp.findUnique({ where: { email } });

    if (!existingUser) {
      return NextResponse.json({ message: 'Invalid User' }, { status: 404 });
    }

    const isValidPassword = await bcrypt.compare(password, existingUser.password);

    if (!isValidPassword) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    const existingLoginUser = await prisma.login.findUnique({ where: { email } });

    if (existingLoginUser) {
      return NextResponse.json({ message: 'User Already login',user:{
        name:existingUser.name,
        email:existingUser.email
      }}, { status: 200 });
    }

    const user = await prisma.login.create({
      data: {
        email,
        password: existingUser.password,
      },
    });

    return NextResponse.json(
      {
        message: 'Login Successfully',
        user: {
          name: existingUser.name,
          email: existingUser.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in login Post:', error);
    return NextResponse.json({ message: 'Error occurred during sign In' }, { status: 500 });
  }
};


export const  DELETE=async(req:NextRequest)=> {
  try {
  const {email}= await req.json()
    const res= await prisma.signUp.delete({where:{email}}) 
    return NextResponse.json({message:'Delete User Successfulyy '},{status:200})
  } catch (error) {
    console.log('Error in deleting user',error)
    return NextResponse.json({message:'Error in deleting user'},{status:500})
  }
  }


