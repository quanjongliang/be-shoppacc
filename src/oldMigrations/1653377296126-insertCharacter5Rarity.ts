// import { TAG_TYPE } from "@/entity";
// import { MigrationInterface, QueryRunner } from "typeorm";

// export class insertCharacter5Rarity1653377296126 implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     const characterList = [
//       {
//         id: 6,
//         name: "Diluc",
//         slug: "diluc",
//         description:
//           "The tycoon of a winery empire in Mondstadt, unmatched in every possible way.",
//         gender: "male",
//         birthday: "April 30th",
//         rarity: 5,
//         vision: "pyro",
//         weapon: "claymore",
//         obtain: "Wish",
//       },
//       {
//         id: 8,
//         name: "Jean",
//         slug: "jean",
//         description:
//           "The righteous and rigorous Dandelion Knight, and Acting Grand Master of the Knights of Favonius in Mondstadt.",
//         gender: "female",
//         birthday: "March 14th",
//         rarity: 5,
//         vision: "anemo",
//         weapon: "sword",
//         obtain: "Wish",
//       },
//       {
//         id: 10,
//         name: "Keqing",
//         slug: "keqing",
//         description:
//           "The Yuheng of the Liyue Qixing. Has much to say about Rex Lapis unilateral approach to policymaking in Liyue - but in truth, gods admire skeptics such as her quite a lot.",
//         gender: "female",
//         birthday: "Nov 20th",
//         rarity: 5,
//         vision: "electro",
//         weapon: "sword",
//         obtain: "Wish",
//       },
//       {
//         id: 11,
//         name: "Klee",
//         slug: "klee",
//         description:
//           "An explosives expert and a regular at the Knights of Favonius\r\n confinement room. Also known as Fleeing Sunlight.",
//         gender: "female",
//         birthday: "Jul 27th",
//         rarity: 5,
//         vision: "pyro",
//         weapon: "catalyst",
//         obtain: "Wish",
//       },
//       {
//         id: 13,
//         name: "Mona",
//         slug: "mona",
//         description:
//           "A mysterious young astrologer who proclaims herself to be Astrologist Mona Megistus,  and who possesses abilities to match the title.",
//         gender: "female",
//         birthday: "Aug 31st",
//         rarity: 5,
//         vision: "hydro",
//         weapon: "catalyst",
//         obtain: "Wish",
//       },
//       {
//         id: 16,
//         name: "Qiqi",
//         slug: "qiqi",
//         description:
//           "An apprentice and herb-picker Bubu Pharmacy. An undead with a bone-white complexion, she seldom has much in the way of words or emotion.",
//         gender: "female",
//         birthday: "March 3rd",
//         rarity: 5,
//         vision: "cryo",
//         weapon: "sword",
//         obtain: "Wish",
//       },
//       {
//         id: 21,
//         name: "Venti",
//         slug: "venti",
//         description:
//           "One of the many bards of Mondstadt, who freely wanders the citys streets and alleys.",
//         gender: "male",
//         birthday: "Jun 16th",
//         rarity: 5,
//         vision: "anemo",
//         weapon: "bow",
//         obtain: "Wish",
//       },
//       {
//         id: 23,
//         name: "Xiao",
//         slug: "xiao",
//         description:
//           "A yaksha adeptus that defends Liyue. Also heralded as the Conqueror of Demons or Vigilant Yaksha.",
//         gender: "male",
//         birthday: "April 17th",
//         rarity: 5,
//         vision: "anemo",
//         weapon: "polearm",
//         obtain: "Wish",
//       },
//       {
//         id: 26,
//         name: "Tartaglia",
//         slug: "tartaglia",
//         description:
//           "Cunning Snezhnayan whose unpredictable personality keeps people guessing his every move.",
//         gender: "male",
//         birthday: "July 20th",
//         rarity: 5,
//         vision: "hydro",
//         weapon: "bow",
//         obtain: "Unknown",
//       },
//       {
//         id: 28,
//         name: "Zhongli",
//         slug: "zhongli",
//         description:
//           "A mysterious guest invited by the Wangsheng Funeral Parlor. Extremely knowledgeable in all things.",
//         gender: "male",
//         birthday: "Dec 31st",
//         rarity: 5,
//         vision: "geo",
//         weapon: "polearm",
//         obtain: "Unknown",
//       },
//       {
//         id: 1,
//         name: "Amber",
//         slug: "amber",
//         description:
//           "Always energetic and full of life, Ambers the best - albeit only - Outrider of the Knights of Favonius.",
//         gender: "female",
//         birthday: "Aug 24th",
//         rarity: 4,
//         vision: "pyro",
//         weapon: "bow",
//         obtain: "Quest",
//       },
//       {
//         id: 2,
//         name: "Barbara",
//         slug: "barbara",
//         description:
//           "Every denizen of Mondstadt adores Barbara. However, she learned the word idol from a magazine.",
//         gender: "female",
//         birthday: "Jul 5th",
//         rarity: 4,
//         vision: "hydro",
//         weapon: "catalyst",
//         obtain: "Wish",
//       },
//       {
//         id: 3,
//         name: "Beidou",
//         slug: "beidou",
//         description:
//           "Beidou is the leader of the Crux an armed fleet based in Liyue Harbor. An armed fleet means exactly what it sounds like: a fleet of ships armed to the teeth.",
//         gender: "female",
//         birthday: "Feb 14th",
//         rarity: 4,
//         vision: "electro",
//         weapon: "claymore",
//         obtain: "Wish",
//       },
//       {
//         id: 4,
//         name: "Bennett",
//         slug: "bennett",
//         description:
//           "A righteous and good-natured adventurer from Mondstadt whos unfortunately extremely unlucky.",
//         gender: "male",
//         birthday: "Feb 29th",
//         rarity: 4,
//         vision: "pyro",
//         weapon: "sword",
//         obtain: "Wish",
//       },
//       {
//         id: 5,
//         name: "Chongyun",
//         slug: "chongyun",
//         description:
//           "A young exortcist from a family of exorcists. He does everything he can to suppress his pure positive energy.",
//         gender: "male",
//         birthday: "Sep 7th",
//         rarity: 4,
//         vision: "cryo",
//         weapon: "claymore",
//         obtain: "Wish",
//       },
//       {
//         id: 7,
//         name: "Fischl",
//         slug: "fischl",
//         description:
//           "A mysterious girl who calls herself Prinzessia der Verurteilung and travels with a night raven named Oz.",
//         gender: "female",
//         birthday: "May 27th",
//         rarity: 4,
//         vision: "electro",
//         weapon: "bow",
//         obtain: "Wish",
//       },
//       {
//         id: 9,
//         name: "Kaeya",
//         slug: "kaeya",
//         description:
//           "A thinker in the Knights of Favonius with a somewhat exotic appearance.",
//         gender: "male",
//         birthday: "Nov 30th",
//         rarity: 4,
//         vision: "cryo",
//         weapon: "sword",
//         obtain: "Quest",
//       },
//       {
//         id: 12,
//         name: "Lisa",
//         slug: "lisa",
//         description:
//           "The languid but knowledgeable Librarian of the Knights of Favonius who was deemed by Sumeru Academia to be their most distinguised graduate in the past two centuries.",
//         gender: "female",
//         birthday: "Jun 9th",
//         rarity: 4,
//         vision: "electro",
//         weapon: "catalyst",
//         obtain: "Quest",
//       },
//       {
//         id: 14,
//         name: "Ningguang",
//         slug: "ningguang",
//         description:
//           "The Tianquan of Liyue Qixing. Her wealth is unsurpassed in all of Teyvat.",
//         gender: "female",
//         birthday: "Aug 26th",
//         rarity: 4,
//         vision: "geo",
//         weapon: "catalyst",
//         obtain: "Wish",
//       },
//       {
//         id: 15,
//         name: "Noelle",
//         slug: "noelle",
//         description:
//           "A maid in the service of the Knights of Favonius that dreams of joining their ranks someday.",
//         gender: "female",
//         birthday: "March 21st",
//         rarity: 4,
//         vision: "geo",
//         weapon: "claymore",
//         obtain: "Wish",
//       },
//       {
//         id: 17,
//         name: "Razor",
//         slug: "razor",
//         description:
//           "A boy who lives among the wolves in Wolvendom of Mondstadt, away from human civilization. As agile as lightning.",
//         gender: "male",
//         birthday: "Sep 9th",
//         rarity: 4,
//         vision: "electro",
//         weapon: "claymore",
//         obtain: "Wish",
//       },
//       {
//         id: 18,
//         name: "Sucrose",
//         slug: "sucrose",
//         description:
//           "An alchemist filled with curiosity about all things. She researches bio-alchemy.",
//         gender: "male",
//         birthday: "May 11th",
//         rarity: 4,
//         vision: "anemo",
//         weapon: "catalyst",
//         obtain: "Wish",
//       },
//       {
//         id: 22,
//         name: "Xiangling",
//         slug: "xiangling",
//         description:
//           "A renowned chef from Liyue. Shes extremely passionate about cooking and excels at making her signature hot and spicy dishes.",
//         gender: "female",
//         birthday: "Nov 2nd",
//         rarity: 4,
//         vision: "pyro",
//         weapon: "polearm",
//         obtain: "Wish",
//       },
//       {
//         id: 24,
//         name: "Xingqiu",
//         slug: "xingqiu",
//         description:
//           "A young man carrying a longsword who is frequently seen at book booths. He has a chivalrous heart and yearns for justice and fairness for all.",
//         gender: "male",
//         birthday: "Oct 9th",
//         rarity: 4,
//         vision: "hydro",
//         weapon: "sword",
//         obtain: "Wish",
//       },
//       {
//         id: 25,
//         name: "Diona",
//         slug: "diona",
//         description:
//           "A young lady who has inherited trace amounts of non-human blood. She is the incredible popular bartender of the Cats Tail tavern.",
//         gender: "female",
//         birthday: "Jan 18th",
//         rarity: 4,
//         vision: "cryo",
//         weapon: "bow",
//         obtain: "Unknown",
//       },
//       {
//         id: 27,
//         name: "Xinyan",
//         slug: "xinyan",
//         description:
//           "Liyues sole rock 'n' roll musician. She rebels against ossified prejudices using her music and passionate singing.",
//         gender: "female",
//         birthday: "Nov 4th",
//         rarity: 4,
//         vision: "pyro",
//         weapon: "claymore",
//         obtain: "Unknown",
//       },
//     ];
//     const saveCharlist = characterList
//       .filter((char) => char.rarity === 5)
//       .map((char) => {
//         const { id, name, slug, ...inf } = char;
//         const information = JSON.stringify(inf);
//         return {
//           title: name,
//           slug,
//           information,
//           type: TAG_TYPE.CHARACTER,
//         };
//       });
//     await queryRunner.manager
//       .createQueryBuilder()
//       .insert()
//       .into("tag")
//       .values(saveCharlist)
//       .execute();
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {}
// }
