import { expect } from "chai";
import { getFilesData } from "../src/controllers/file.controller.js";

describe("file.controller.js", () => {
  it("should return 200 status code with file details", async () => {
    const req = {};
    const res = {
      status: function (statusCode) {
        expect(statusCode).to.equal(200);
        return {
          send: function (data) {
            expect(data).to.be.an("array");
            expect(data[0]).to.have.property("file");
            expect(data[0]).to.have.property("lines");
            const lines = data[0].lines;
            expect(lines).to.be.an("array");
            expect(lines[0]).to.have.property("text");
            expect(lines[0]).to.have.property("number");
            expect(lines[0]).to.have.property("hex");
          },
        };
      },
    };
    await getFilesData(req, res);
  });
});
