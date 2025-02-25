import { db } from "@/app/libs/prismadb"
import { NextResponse } from "next/server"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken";


export async function POST(req:Request) {
      
    try {
            const body  = await req.json()   
           const  {email , password} = body

            if(!email || !password){
                return NextResponse.json({message: "All fields are required"},{status: 400})
            }

            const user  = await db.user.findUnique({
                where: {email}
            })

            if(!user){
                return NextResponse.json({message: "Invalid Credential"},{status: 401})
            }

            const isPasswordMatch = await compare(password , user.password)
            
            if(!isPasswordMatch){
                 return NextResponse.json({message: 'Invalid Crredentails'},{status:401})
            }

            const token = sign(
                { id: user.id, email: user.email, role: user.role },
                process.env.JWT_SECRET!,
                { expiresIn: "1h" }
            
            )

            return NextResponse.json({token, role: user.role,  message: "Login successful"})
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });

    }
}