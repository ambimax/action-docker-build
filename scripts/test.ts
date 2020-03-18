import * as fs from "fs";
import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as YAML from "yaml";

async function run(): Promise<void> {
    const tests = fs.readdirSync(`${__dirname}/../test`);
    for (const test of tests) {
        await runTest(test);
    }
}

async function runTest(test: string): Promise<void> {
    console.log("Start test:", test);

    const cwd = `${__dirname}/../test/${test}`;
    let inputs = YAML.parse(fs.readFileSync(`${cwd}/inputs.yml`).toString());

    if (typeof inputs?.with !== "object") {
        core.setFailed(`inputs.yml must define "with"`);
        process.exit(1);
    }

    if (inputs.with === null) {
        inputs.with = {};
    }

    inputs = inputs.with;

    await exec.exec("node", [`${__dirname}/../dist`], {
        cwd,
        env: Object.assign(
            process.env,
            ...Object.keys(inputs).map(key => ({
                ["INPUT_" + key.toUpperCase()]: ((inputs as unknown) as Record<
                    string,
                    string
                >)[key],
            })),
        ),
    });
}

run().catch(e => {
    console.error("Unhandled exception", e);
    process.exit(1);
});
