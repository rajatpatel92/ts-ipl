import { PredictionModule } from './prediction.module';

describe('PredictionModule', () => {
    let predictionModule: PredictionModule;

    beforeEach(() => {
        predictionModule = new PredictionModule();
    });

    it('should create an instance', () => {
        expect(predictionModule).toBeTruthy();
    });
});
