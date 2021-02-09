const { expect } = require("chai");
const pako = require("pako");

const ErrorCode = Object.freeze({
  ERR_NONE: 0,
  ERR_NOT_TERMINATED: 1,
  ERR_OUTPUT_EXHAUSTED: 2,
  ERR_INVALID_BLOCK_TYPE: 3,
  ERR_STORED_LENGTH_NO_MATCH: 4,
  ERR_TOO_MANY_LENGTH_OR_DISTANCE_CODES: 5,
  ERR_CODE_LENGTHS_CODES_INCOMPLETE: 6,
  ERR_REPEAT_NO_FIRST_LENGTH: 7,
  ERR_REPEAT_MORE: 8,
  ERR_INVALID_LITERAL_LENGTH_CODE_LENGTHS: 9,
  ERR_INVALID_DISTANCE_CODE_LENGTHS: 10,
  ERR_MISSING_END_OF_BLOCK: 11,
  ERR_INVALID_LENGTH_OR_DISTANCE_CODE: 12,
  ERR_DISTANCE_TOO_FAR: 13,
  ERR_CONSTRUCT: 14,
});

function buf2hex(buffer) {
  return Array.prototype.map
    .call(new Uint8Array(buffer), (x) => ("00" + x.toString(16)).slice(-2))
    .join("");
}

describe("InflateLibTest", function () {
  it("Should inflate", async function () {
    const factory = await ethers.getContractFactory("InflateLibTest");
    const tester = await factory.deploy();

    const input = new Uint8Array(
      new TextEncoder("ASCII").encode(
        "wArb3FEVLcDAmarvrcktWK0Ao3afXj8Drqwfdkn6ZunM5EVtYSb5aBfc8gGvXgstvuI15mhILyvtzuAeuPtddWZ6btxFNjd2GUiCaFIl09dtWWKqvy71UJN0zFRcE3xfgaYKxh6yRYNO2gaT2U0BvHoU6Wil85t9LiyvbrOM3sRJNB7iRxow5KrburmE3OdM9kYQPvEcKzaW3fCp1GJrTJluIryVSy5OBD7jY4xIgYjhTYC0WKQ3pbTN2bM3s74j"
      )
    );
    const compressed = pako.deflateRaw(input, { level: 9 });

    console.log("input: ", buf2hex(input.buffer));
    console.log("");
    console.log("compr: ", buf2hex(compressed.buffer));
    console.log("");

    await tester.deployed();
    const result = await tester.puff(compressed, input.length);
    const err = result[0];
    const decompressed = result[1];
    expect(err).to.equal(0);

    console.log(decompressed);

    expect(decompressed.slice(2)).to.equal(buf2hex(input.buffer));
  });
});
