import axios from "axios";

export async function sendIndentifyRequest(dataPlane:string,writeKey:string){
    const payload = {
        userId: "identified user id",
        anonymousId: "anon-id-new",
        context: {
        traits: { trait1: "new-val" },
        ip: "14.5.67.21",
        library: { name: "http" }
        },
        timestamp: "2020-02-02T00:23:09.544Z"
    }
    const url = `${dataPlane}/v1/identify`;
    const response = await axios.post(url,payload,{
        auth:{username:writeKey,password:""},
        headers:{"Content-Type":"application/json"}
    })
    console.log("status : ",response.data);
    
    return response.status;
}