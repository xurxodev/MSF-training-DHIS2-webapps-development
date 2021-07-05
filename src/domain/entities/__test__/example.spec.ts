function sum(a: number, b: number) {
    return a + b;
}

beforeEach(() => {});
afterEach(() => {});

describe("Example group1", () => {
    describe("Example group2", () => {
        it("adds 1 + 2 to equal 3", () => {
            expect(sum(1, 2)).toBe(3);
        });
    });
});

export default {}