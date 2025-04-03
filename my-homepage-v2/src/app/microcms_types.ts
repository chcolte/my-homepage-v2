import type {
 MicroCMSQueries,
 MicroCMSImage,
 MicroCMSDate,
 MicroCMSContentId,
} from "microcms-js-sdk";

//カテゴリタグの型定義
export type Tag = {
    id: string,
    name: string,
} & MicroCMSDate;

//ブログの型定義
export type Blog = {
    id: string;
    title: string;
    content: string;
    eyecatch?: MicroCMSImage;
    author: string;
    tags: Array<Tag>;
} & MicroCMSDate;