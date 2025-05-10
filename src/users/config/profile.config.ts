import { registerAs } from '@nestjs/config';

export default registerAs('profile', () => ({
  sampleApiKey: process.env.SAMPLE_API_KEY,
}));
