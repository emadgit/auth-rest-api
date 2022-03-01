import render, { testUser } from "../../services/test.service";
import Container from "./Container";

describe("Profile Container", () => {
  it("renders profile container as expected", async () => {
    const rc = render(Container, { message: "Testing", children: <p>Hello!</p> });
    expect(rc.queryByText("Testing", { selector: "h3 strong" }));
    expect(rc.queryByText("Hello!", { selector: "p" }));
  });
});
