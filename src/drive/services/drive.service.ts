import { Response } from "express";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  StreamableFile,
} from "@nestjs/common";
import { GoogleAuth } from "google-auth-library";
import { drive_v3, google } from "googleapis";
import {
  APPLICATION_TAR_MIMETYPE,
  getFileMediaDrive,
  getFileMetaDataDrive,
  removeFileFs,
} from "../common";
import * as fs from "fs";
import { randomUUID } from "crypto";
import { FileDownloadInterface } from "../intefaces";
@Injectable()
export class DriveService {
  private googleAuth: GoogleAuth;
  private driveService: drive_v3.Drive;
  constructor() {
    this.googleAuth = new google.auth.GoogleAuth({
      keyFile: "src/core/constants/googlekey.json",
      scopes: ["https://www.googleapis.com/auth/drive"],
    });
    this.driveService = google.drive({ version: "v3", auth: this.googleAuth });
  }

  async uploadFile(file: Express.Multer.File) {
    try {
      const { mimetype, path, filename } = file;
      const media = getFileMediaDrive(mimetype, path);
      const fileMetaData = getFileMetaDataDrive(filename);
      const response = await this.driveService.files.create({
        media,
        fields: "id",
        requestBody: fileMetaData,
      });
      await this.setFilePublic(response.data.id);
      return removeFileFs(path);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }
  async uploadBackupFile(name:string,path:string){
    const media = getFileMediaDrive(APPLICATION_TAR_MIMETYPE,path)
    const fileMetaData = getFileMetaDataDrive(name)
    const response = await this.driveService.files.create({
      media,
      fields:'id',
      requestBody:fileMetaData
    })
    removeFileFs(path);
    return response.data.id
  }

  async getFileUrlById(fileId: string) {
    return this.driveService.files.get({
      fileId,
      fields: "*",
    });
  }
  async setFilePublic(fileId: string) {
    return this.driveService.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
  }
  async deleteFile(fileId: string) {
    return this.driveService.files.delete({ fileId });
  }

  // async downloadFile(fileId: string) {
  //   const { id, name, mimeType } = await this.driveRepository.findOneIfExist(fileId);
  //   const newName = randomUUID() + name;
  //   if (!id) throw new NotFoundException(`Drive id: ${id} not found!`);
  //   return this.driveService.files
  //     .get({ fileId, alt: "media" }, { responseType: "stream" })
  //     .then(
  //       ({ data }) =>
  //         new Promise(
  //           (resolve: (file: FileDownloadInterface) => void, reject) => {
  //             const buf: Uint8Array[] = [];
  //             data.on("data", (e) => buf.push(e));
  //             data.on("error", (err) => reject(err));
  //             data.on("end", () => {
  //               const file = Buffer.concat(buf);
  //               return resolve({ file, mimeType, newName });
  //             });
  //           }
  //         )
  //     );
  // }
}
