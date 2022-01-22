import { PaillierPublicKey } from "@big3/ciber-modules";
import {Option} from './option';

export interface Poll {
    options: Array<Option>,
    pollName: String,
    pubKey: PaillierPublicKey,
    result: Array<Number>
}
