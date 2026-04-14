import { handleApiRequest } from "@/lib";
import { userService } from "@/services";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest, payload: GetUserPayloadType) {

    return handleApiRequest<GetUserPayloadType>(request, payload, )
}