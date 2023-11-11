import { Layerr } from "layerr";
import { Response } from "@buttercup/fetch";
import { ERR_UNKNOWN } from "./symbols.js";

export function handleBadResponse(res: Response, code: string = ERR_UNKNOWN): void {
    if (!res.ok) {
        throw new Layerr({
            info: {
                code,
                status: res.status,
                statusText: res.statusText
            }
        }, "Bad response");
    }
}
