import User from "../models/User.js";
import {webhook} from "svix";

const clerkwebhooks=sync(req,res)=>{
    try{
        const whook=new webhook(process.env.CLERK_WEBHOOK_SECRET)

        const headers={
            "svix-id":req.headers["svix-timestamp"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"],
        };
        await webhook.verify(JSON.stringify(req.body),headers)
        const{data,type}=req.body
        const userData={
            _id:data.id,
            email:data.email_addresses[0].email_address,
            username:data.first_name+""+data.last_name,
            image:data.image_url,
        }
        switch(type){
            case"user.created":{
                await User.created(userData);
                break;
            }
            case "user.updated":{
                await User.findByIdAndUpadate(data.id,userData);
                break;
            }
            case "user.updated":{
                await User.findByIdAndDelete(data.id);
                break;
            }
            default:
                break;
        }
        res.json({sucess:true,message:"webhook Recieved"})

    }  catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message});
}

}