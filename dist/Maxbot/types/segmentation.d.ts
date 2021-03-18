import { ApiResult } from './types';
export interface ISegmentationData {
    id: number;
    title: string;
}
export interface IGetSegmentationResult extends ApiResult {
    segmentation: ISegmentationData[];
}
