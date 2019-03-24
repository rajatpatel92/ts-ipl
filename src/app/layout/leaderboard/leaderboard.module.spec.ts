import { LeaderboardModule } from './leaderboard.module';

describe('LeaderboardModule', () => {
    let tablesModule: LeaderboardModule;

    beforeEach(() => {
        tablesModule = new LeaderboardModule();
    });

    it('should create an instance', () => {
        expect(tablesModule).toBeTruthy();
    });
});
