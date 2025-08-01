import { NextRequest } from "next/server";
import axios from "axios";
import { storage } from "@/config/firebase";
import { ref, uploadString } from "firebase/storage";

export async function POST(req: NextRequest){
    const data=await req.json();
    const {url}=data;
    const base64Image="data:image/png:base64,"+await convertImage(url);
    const fileName='/ai-story'+Date.now()+".png"
    const imageRef=ref(storage,fileName)

    await uploadString(imageRef,base64Image);
}
export const convertImage=async(imageUrl:string)=>{
    try{
        const response=await axios.get(imageUrl,{responseType:'arraybuffer'});
        const base64Image=Buffer.from(response.data).toString('base64');
        return base64Image;
    }catch(e){
        console.log("error converting base 64 image. ")

    }
} 