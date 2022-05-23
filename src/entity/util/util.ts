import { Tag, TAG_TYPE } from "../tag";

export const convertToStringTagSlug = (tags: Tag[], type: TAG_TYPE) :string=>{
    return [...tags]
    .reduce((characterString, tag) => {
      if (tag.type === type) {
        characterString += tag.slug + ",";
      }
      return characterString;
    }, "")
    .slice(0, -1);
}