import { Injectable, Logger } from "@nestjs/common";
import { exec } from "child_process";
import { Cron } from "@nestjs/schedule";
// const { execute } = require("@getvim/execute");
// const compress = require("gzipme");
// const fs = require("fs");
@Injectable()
export class ServiceVpsService {
  private readonly logger = new Logger(ServiceVpsService.name);

  // @Cron("*/5 * * * * *")
  @Cron("*/5 * * * *")
  restartPostgres() {
    this.logger.debug("Check postgres exist every 5 minutes");
    exec(
      " ps -ef | awk '{ print $8 }' | grep postgresql | wc -l",
      (error, stdout, stderr) => {
        if (error) console.log(`error: ${error}`);
        if (stderr) console.log(`stderr: ${stderr}`);
        if (Number(stdout) > 0) console.log("Nice running postgres");
        exec(
          "service postgresql restart",
          (errorRestart, stdoutRestart, stderrRestart) => {
            if (errorRestart) console.log(`errorRestart: ${errorRestart}`);
            if (stdoutRestart) console.log(`stdoutRestart: ${stdoutRestart}`);
            console.log(`stderrRestart: ${stderrRestart}`);
          }
        );
        console.log("nhu con cac");
      }
    );
    // const date = new Date();
    // const currentDate = `${date.getFullYear()}.${
    //   date.getMonth() + 1
    // }.${date.getDate()}.${date.getHours()}.${date.getMinutes()}`;
    // const fileName = `database-backup-${currentDate}.tar`;
    // execute(
    //   `PGPASSWORD="${process.env["POSTGRES_PASSWORD"]}" pg_dump -U ${process.env["POSTGRES_USER"]} -d ${process.env["POSTGRES_DB"]} -f ${fileName} -F t`
    // )
    //   .then(async (res) => {
    //     await compress(fileName);
    //     fs.unlinkSync(fileName);
    //     console.log(res);
    //     console.log("Finito");
    //   })
    //   .catch((err) => {
    //     console.log("error");
    //     console.log(err);
    //   });
  }
}
