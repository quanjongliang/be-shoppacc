import { UserRepository } from "@/repository";
import { Processor, Process } from "@nestjs/bull";
import { Job } from "bull";
import { MailerService } from "./mailer.service";

@Processor("audio")
export class AudioConsumer {
  constructor(
    private mailerSerivce: MailerService,
    private userRepository: UserRepository
  ) {}
  @Process()
  async transcode(job?: Job<unknown>) {
    let progress = 0;
    const users = await this.userRepository.find();
    // const sendMailUsers = users.map(async (user) => {
    users.forEach(async (user) => {
      //   await this.mailerSerivce.sendThanksMail(user.email);
      console.log(`Sended ${user.email}`);
    });
    // await job.progress(sendMailUsers);
    // for (i = 0; i < 100; i++) {
    //   await doSomething(job.data);
    //   progress += 1;
    //   await job.progress(progress);
    // }
    return {};
  }
}
