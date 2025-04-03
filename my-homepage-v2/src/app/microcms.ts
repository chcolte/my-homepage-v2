// libs/microcms.ts

import { createClient } from "microcms-js-sdk";
import type {MicroCMSQueries} from "microcms-js-sdk";
import {Blog, Tag} from "./microcms_types";


if (!process.env.MICROCMS_SERVICE_DOMAIN) {
    throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
    throw new Error("MICROCMS_API_KEY is required");
}

// API取得用のクライアントを作成
export const client = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY,
});

// ブログ一覧を取得
export const getList = async (queries?: MicroCMSQueries) => {
    const listData = await client.getList<Blog>({
        endpoint: "blogs",
        queries,
    });
    return listData;
};

// ブログの詳細を取得
export const getDetail = async (
 contentId: string,
 queries?: MicroCMSQueries
) => {
 const detailData = await client.getListDetail<Blog>({
  endpoint: "blogs",
  contentId,
  queries,
 });

 return detailData;
};

// タグ一覧を取得
export const getTagList = async (queries?: MicroCMSQueries) => {
    const tagListData = await client.getList<Tag>({
        endpoint: "categories",
        queries,
    });
    return tagListData.contents;
};