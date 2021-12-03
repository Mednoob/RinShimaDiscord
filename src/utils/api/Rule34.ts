import { Rule34Post } from "../../typings";
import { ClientUtils } from "../ClientUtils";

export async function getImages(tags: string[]): Promise<Rule34Post[]> {
    const response = await ClientUtils.REST.get(`https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&limit=100&tags=${tags.join("+")}`).json<Rule34Post[]>();

    return response;
}
