import { prisma } from "@/db/config";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  try {
    const {  username, email, password } = await req.json();
 
    if (!username||!email||!password) {
      return NextResponse.json({ message: 'Please fill all fields' }, { status: 400 });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const alreadySignUpUser = await prisma.signUp.findUnique({ where: { email } });

    if (alreadySignUpUser) {
      return NextResponse.json({ message: 'User Already Sign Up' }, { status: 200 });
    } else {
      const user = await prisma.signUp.create({
        data: {
          name:username,
          email,
          password: hashPassword,
        },
      });

      return NextResponse.json({ message: "User Sign Up Successfully", user }, { status: 201 });
    }
  } catch (error) {
    console.error("Error in register Post:", error);
    return NextResponse.json({ message: 'Error occurred during sign up' }, { status: 500 });
  }
};

// export const  DELETE=async(req:NextRequest)=> {
//   try {
//   const {email}= await req.json()
//     const res= await prisma.signUp.delete({where:{email}}) 
//     return NextResponse.json({message:'Delete User Successfulyy '},{status:200})
//   } catch (error) {
//     console.log('Error in deleting user',error)
//     return NextResponse.json({message:'Error in deleting user'},{status:500})
//   }
//   }