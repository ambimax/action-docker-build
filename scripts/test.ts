import * as fs from "fs";
import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as YAML from "yaml";

async function run(): Promise<void> {
    process.exitCode = 0;

    const tests = fs.readdirSync(`${__dirname}/../test`);
    for (const test of tests) {
        await runTest(test);
    }

    if (process.exitCode !== 0) {
        console.error("At least one test failed!");
    } else {
        console.log("All tests ran successfully!");
    }
}

async function runTest(test: string): Promise<void> {
    const cwd = `${__dirname}/../test/${test}`;
    let inputs = YAML.parse(fs.readFileSync(`${cwd}/inputs.yml`).toString());

    console.log("TEST:START", test);
    console.log();
    console.log();

    try {
        if (typeof inputs?.with !== "object" || inputs.with === null) {
            core.setFailed(`inputs.yml must define "with"`);
            process.exit(1);
        }

        inputs = inputs.with;

        const env = Object.assign(
            {},
            process.env,
            ...Object.keys(inputs).map(key => ({
                ["INPUT_" + key.toUpperCase()]: ((inputs as unknown) as Record<
                    string,
                    string
                >)[key],
            })),
        );

        const result = await exec.exec("node", [`${__dirname}/../dist`], {
            cwd,
            env: env,
            ignoreReturnCode: true,
        });

        if (result !== 0) {
            throw new Error(`Process returned ${result}`);
        }
    } catch (e) {
        console.log();
        console.log();
        console.error("TEST:RESULT", test, "FAILED", e);
        console.log();
        console.log();
        console.log();
        process.exitCode = 1;

        return;
    }

    console.log();
    console.log();
    console.error("TEST:RESULT", test, "SUCCESS");
    console.log();
    console.log();
    console.log();
}

run().catch(e => {
    console.error("Unhandled exception", e);
    process.exit(1);
});
