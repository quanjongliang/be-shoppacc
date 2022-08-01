import { GOOGLE_API_FOLDER_ID } from "@/core";
import {
  FileMediaDriveInteface,
  FileMetaDataDriveInferface,
} from "../intefaces";
import * as fs from "fs";
export const getFileMetaDataDrive = (
  fileName: string
): FileMetaDataDriveInferface => ({
  name: fileName,
  parents: [GOOGLE_API_FOLDER_ID],
});

export const getFileMediaDrive = (
  mimeType: string,
  filePath: string
): FileMediaDriveInteface => ({
  mimeType,
  body: fs.createReadStream(filePath),
});

export const removeFileFs = (filePath: string) => fs.unlinkSync(filePath);

export const APPLICATION_TAR_MIMETYPE='application/x-tar'