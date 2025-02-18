import { SetMetadata } from '@nestjs/common';

export const FEATURE_KEY = 'requiredFeature';
export const RequireFeature = (feature: string) => SetMetadata(FEATURE_KEY, feature); 