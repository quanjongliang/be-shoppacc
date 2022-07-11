import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

@Processor("message-queue")
export class MessageConsumer {
  @Process("message-job")
  readOperationJob(job: Job<unknown>) {
    console.log("hello", job.data);
    for (let i = 0; i < 100; i++) {
      console.log(i);
    }
    return {};
  }
}
