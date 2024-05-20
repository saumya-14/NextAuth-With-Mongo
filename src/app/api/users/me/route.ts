// import {connect} from  '@/dbConfig/dbConfig'
// import User from '@/models/userModel'
// import {NextRequest,NextResponse} from 'next/server'

// import { getDataFromToken } from '@/helpers/getDataFromToken'

// connect()

// export async function POST(request:NextRequest){
//     const userId= await getDataFromToken(request)
//     const user=User.findOne({_id:userId}).select("-password")
//     if(!user) return NextResponse.json({message:"User not found"},{status:401});

//     return NextResponse.json({
//         message:"User found",
//         data: user
//     })
// }
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from '@/helpers/getDataFromToken';

connect();

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);

        const user = await User.findOne({ _id: userId }).select('-password').lean(); // Use .lean() to get a plain object
        if (!user) return NextResponse.json({ message: "User not found" }, { status: 401 });

        return NextResponse.json({
            message: "User found",
            data: user
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
