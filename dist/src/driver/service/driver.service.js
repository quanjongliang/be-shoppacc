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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverService = void 0;
const core_1 = require("../../core");
const repository_1 = require("../../repository");
const common_1 = require("@nestjs/common");
const fs = require("fs");
const googleapis_1 = require("googleapis");
let DriverService = class DriverService {
    constructor(driverRepository) {
        this.driverRepository = driverRepository;
        this.oauth2Client = new googleapis_1.google.auth.OAuth2(core_1.DRIVE_CONFIG.CLIENT_ID, core_1.DRIVE_CONFIG.CLIENT_SECRET, core_1.DRIVE_CONFIG.REDIRECT_URI);
        this.drive = googleapis_1.google.drive({
            version: 'v3',
            auth: this.oauth2Client,
        });
    }
    async uploadFile(file, isBanner = false, order = 0) {
        await this.getAccessToken(this.oauth2Client);
        const { filename, path, mimetype } = file;
        const { token } = await this.oauth2Client.getAccessToken();
        if (token) {
            this.oauth2Client.setCredentials({
                access_token: token,
            });
        }
        const fileUpload = fs.createReadStream(`./${path}`);
        const { data: fileData } = await this.drive.files.create({
            requestBody: {
                name: filename,
                mimeType: mimetype,
            },
            media: {
                mimeType: mimetype,
                body: fileUpload,
            },
        });
        fs.unlinkSync(`./${path}`);
        const { data: linkData } = await this.generatePublicUrl(fileData.id);
        const { id: driverId } = fileData, otherFileData = __rest(fileData, ["id"]);
        const newDriverImage = this.driverRepository.create(Object.assign(Object.assign(Object.assign({ driverId,
            filename }, otherFileData), linkData), { isBanner,
            order }));
        return this.driverRepository.save(newDriverImage);
    }
    async uploadMultiFiles(files) {
        await this.getAccessToken(this.oauth2Client);
        const listOldBannerDrivers = await this.driverRepository.find({
            isBanner: true,
        });
        await Promise.all([
            this.driverRepository.remove(listOldBannerDrivers),
            listOldBannerDrivers.map((data) => this.deleteFile(data.driverId)),
        ]);
        const promiseUploadMultiFile = files.map((file, index) => this.uploadFile(file, true, index + 1));
        return Promise.all(promiseUploadMultiFile);
    }
    async getBannerDriver() {
        return this.driverRepository.find({ isBanner: true });
    }
    async deleteFile(fileId) {
        return this.drive.files.delete({
            fileId,
        });
    }
    async generatePublicUrl(fileId) {
        await this.drive.permissions.create({
            fileId,
            requestBody: {
                role: core_1.DRIVE_CONFIG.ROLE.READER,
                type: core_1.DRIVE_CONFIG.TYPE.ANYONE,
            },
        });
        return this.drive.files.get({
            fileId,
            fields: core_1.DRIVE_CONFIG.FIELDS,
        });
    }
    async getAccessToken(oAuth2Client) {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: core_1.DRIVE_CONFIG.SCOPES,
            include_granted_scopes: true,
        });
        const { token } = await this.oauth2Client.getAccessToken();
        if (token) {
            this.oauth2Client.setCredentials({
                refresh_token: token,
            });
        }
    }
};
DriverService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.DriverRepository])
], DriverService);
exports.DriverService = DriverService;
//# sourceMappingURL=driver.service.js.map