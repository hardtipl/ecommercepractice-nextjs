import jsontoken from "jsonwebtoken";
import config from '../config';

export function generatetoken(availabeldata: Object = { Test: "Testdata", enjoy: true }, secreatkey: string = config.secreatkey, tilltime: number = 3600 * 24 * 30): string {
    // let assigntime:any;
    // if (tilltime != null) {
    //     assigntime ={ expiresIn:60 * 100}
    //         // expiresIn:"120ms"
// console.log(Object.entries(availabeldata))
// console.log(availabeldata)
    // }
    // else {
    //     assigntime = null
    // }
    console.log(tilltime)
    const generated = jsontoken.sign({availabeldata}, secreatkey, 
        // { expiresIn: tilltime }
        );
    return generated
}
