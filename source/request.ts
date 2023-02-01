import _Layerr from "layerr";
import { ERR_UNKNOWN } from "./symbols.js";

const { Layerr } = _Layerr;

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
