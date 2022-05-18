"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const reader = require("xlsx");
const entity_1 = require("./entity");
const post_1 = require("./post");
const repository_1 = require("./repository");
let AppService = class AppService {
    constructor(userRepository, postRepository) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }
    getHello() {
        return 'Hello World!';
    }
    getDataFromExcel() {
        const file = reader.readFile('./db/oldUser.xlsx');
        const sheets = file.SheetNames;
        let data = [];
        for (let i = 0; i < sheets.length; i++) {
            const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
            temp.forEach(({ username, email, phone, role, password }) => {
                const truePhone = phone ? +`0${phone}` : '';
                const trueRole = role === '1' ? entity_1.USER_ROLE.ADMIN : entity_1.USER_ROLE.USER;
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
            where: [{ slug: '' }, { slug: null }],
        });
        const promiseUpdateSlug = listPostNoSlug.map((post) => this.postRepository.save(Object.assign(Object.assign({}, post), { slug: (0, post_1.changeToSlug)(post.title, post.createdAt) })));
        await Promise.all([...promiseUpdateSlug]);
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.UserRepository,
        repository_1.PostRepository])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map