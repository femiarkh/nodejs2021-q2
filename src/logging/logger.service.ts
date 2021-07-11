import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class MyLogger extends ConsoleLogger {}
