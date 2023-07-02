import { NextRequest, NextResponse } from "next/server";
import {db} from "@vercel/postgres"
import { error } from "console";
export async  function  GET(req:Request){
    const client=await db.connect();

    try {
        await client.sql`CREATE TABLE if NOT EXISTS Todos (id serial,task varchar(255));`
        const getall=await client.sql`SELECT * FROM Todos;`
        return NextResponse.json({
            data:getall.rows.find((item)=> item.id===2
            
            )
        })
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"something went wrong"});
        
    }
    return NextResponse.json({
        message:"you called this api"
    })  
}


export async function POST(req:NextRequest) {
    const reqq=await req.json();
    const client=await db.connect();
  try {
    if(reqq.task){
       

       const r= await client.sql`INSERT INTO Todos (Task) VALUES (${reqq.task});`
       console.log(r);
        return NextResponse.json({
            "messgae":"Data is added"
        })
        
    }
    else{
        throw new Error("task field is requried");
    }
    
  } catch (error) {
    return NextResponse.json({
        message:(error as {message:string}).message
    })
    
  }

    
}