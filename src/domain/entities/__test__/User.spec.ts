import { User } from "../User";

describe("User", () => {
    it("should be admin if has authority ALL", () => {
        const user = User.create({
            id: "H4atNsEuKxP",
            name: "Example user",
            authorities: ["F_SQLVIEW_EXECUTE", "F_USER_VIEW", "F_GENERATE_MIN_MAX_VALUES", "ALL"],
        });

        expect(user.isAdmin).toBe(true);
    });

    it("should not be admin if has not authority ALL", () => {
        const user = User.create({
            id: "H4atNsEuKxP",
            name: "Example user",
            authorities: ["F_SQLVIEW_EXECUTE", "F_USER_VIEW", "F_GENERATE_MIN_MAX_VALUES"],
        });

        expect(user.isAdmin).toBe(false);
    });
});
