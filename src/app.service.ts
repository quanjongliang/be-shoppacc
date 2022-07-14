import { Injectable } from "@nestjs/common";
import * as reader from "xlsx";
import { USER_ROLE } from "./entity";
import { changeToSlug } from "./post";
import { PostRepository, UserRepository } from "./repository";
import * as fs from "fs";
@Injectable()
export class AppService {
  constructor(
    private userRepository: UserRepository,
    private postRepository: PostRepository
  ) {}
  getHello(): string {
    return "Hello World!";
  }

  getDataFromExcel() {
    const file = reader.readFile("./db/oldUser.xlsx");
    const sheets = file.SheetNames;
    let data = [];
    for (let i = 0; i < sheets.length; i++) {
      const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
      temp.forEach(({ username, email, phone, role, password }) => {
        const truePhone = phone ? +`0${phone}` : "";
        const trueRole = role === "1" ? USER_ROLE.ADMIN : USER_ROLE.USER;
        data.push({
          username,
          email,
          phone: truePhone,
          role: trueRole,
          password,
        });
      });
    }
    const listUsers = this.userRepository.create(data);
    return this.userRepository.save(listUsers);
  }

  async updateSlugPost() {
    const listPostNoSlug = await this.postRepository.find({
      where: [{ slug: "" }, { slug: null }],
    });
    const promiseUpdateSlug = listPostNoSlug.map((post) =>
      this.postRepository.save({
        ...post,
        slug: changeToSlug(post.title, post.createdAt),
      })
    );
    await Promise.all([...promiseUpdateSlug]);
  }

  async getWeaponJsonFile() {
    const jsonsInDir = fs.readdirSync("./db/weapons");
    const list = [];
    jsonsInDir.forEach((path) => {
      const data = fs.readFileSync("./db/weapons/" + path);
      const {
        name,
        description,
        weapontype,
        rarity,
        baseatk,
        substat,
        subvalue,
        effectname,
        effect,
      } = JSON.parse(data.toString());
      const slug = changeToSlug(name);
      list.push({
        slug,
        name,
        description,
        weapontype,
        rarity,
        baseatk,
        substat,
        subvalue,
        effectname,
        effect,
      });
    });
    return list;
  }
}
