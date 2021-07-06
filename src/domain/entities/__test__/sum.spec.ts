import sum from "../sum";

beforeEach(() => {});
afterEach(() => {});

describe("Example group1", () => {
    describe("Example group2", () => {
        it("adds 1 + 2 to equal 3", () => {
            expect(sum(1, 2)).toBe(3);
        });
    });
});
