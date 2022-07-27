import { TAG_TYPE } from "@/entity";

export const getNotFoundTagMessage = (
  title: string,
  type: TAG_TYPE
): string => {
  return `${type.toLowerCase()} tên ${title} không tồn tại, vui lòng thử lại! `;
};

export const DEFAULT_GENSHIN_IMPACT_TAG_SLUG='genshin-impact'