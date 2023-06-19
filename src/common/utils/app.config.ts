import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { getEnvPath } from '../helper/env.helper';

const path = require('path');
const filePath = path.resolve(__dirname, '..', 'envs');
const envFilePath: string = getEnvPath(filePath);

console.log('path', envFilePath);

config({ path: envFilePath });

const service = new ConfigService();

export { service };
