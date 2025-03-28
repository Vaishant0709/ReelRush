import { NextRequest,NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/db";
import User from "@/models/User";

export async function POST(request : NextRequest){
  try {
    const {email,password}=await request.json();

    if(!email || !password){
      return NextResponse.json(
        {error:"Email and pasword are required"},
        {status:400}
      );
    }

    await connectToDatabase();

    const existingUser=await User.findOne({email});

    if(existingUser){
      return NextResponse.json(
        {error:"Email is already regsitered"},
        {status:400}
      );
    }

    await User.create({
      email,
      password
    });

    return NextResponse.json(
      {message:"User Registered successfully"},
      {status:200}
    );

  } catch (error) {
    console.log(`ERROR :: USER REGISTERATION :: ${error}`);
    return NextResponse.json(
      {error : "Failed to Register User"},
      {status:500}
    );
  }
}
