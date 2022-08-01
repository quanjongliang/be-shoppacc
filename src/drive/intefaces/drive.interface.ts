import { ReadStream } from "fs";

export interface FileMetaDataDriveInferface {
  name: string;
  parents: string[];
}

export interface FileMediaDriveInteface {
  mimeType: string;
  body: ReadStream;
}

export interface FileDownloadInterface {
  mimeType: string;
  newName: string;
  file: Buffer;
}
