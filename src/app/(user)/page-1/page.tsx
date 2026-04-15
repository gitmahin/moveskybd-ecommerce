import axios from "axios"
import { cookies, headers } from "next/headers";
export default async function Page() {
 
    return <div>
{(await cookies()).get("accessToken")?.value}
    </div>
}