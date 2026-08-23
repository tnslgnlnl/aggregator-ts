import { fetchFeed } from "../lib/rss.js";

export async function handlerAgg() {
    const feedURL = "https://www.wagslane.dev/index.xml";
    const feedData = await fetchFeed(feedURL);
    const feedDataStr = JSON.stringify(feedData, null, 2);
    console.log(feedDataStr);
}