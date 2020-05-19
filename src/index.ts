import "source-map-support/register";
import core from "@actions/core";
import exec from "@actions/exec";
import * as autogen from "./autogen";
import * as fs from "fs";

/**
 * Main entrypoint for the action.
 */
async function run(): Promise<void> {
    const inputs = autogen.getInputParameters();

    await build(inputs);
}

async function build(inputs: autogen.InputParameters): Promise<void> {

    if (inputs.registry && inputs.username && inputs.password) {
        core.startGroup("Log into private registry");
        await exec.exec("docker", [
            "login",
            "--username",
            inputs.username,
            "--password",
            inputs.password,
            inputs.registry,
        ]);
        core.endGroup();
    } else {
        console.log("Build without logging into private registry")
    }

    if (inputs.composefile) {
        if (!fs.existsSync(inputs.composefile)) {
            core.setFailed(
                `The provided docker-compose file does not exist: ${inputs.composefile}`,
            );
            process.exit(1);
        }

        core.startGroup("Build docker-compose file");
        await exec.exec("docker-compose", ["-f", inputs.composefile, "build"]);
        core.endGroup();
    } else {
        core.startGroup("Build Dockerfile file");
        await exec.exec("docker", [
            "image",
            "build",
            "-t",
            inputs.tag,
            "-f",
            inputs.dockerfile,
            inputs.context,
        ]);
        core.endGroup();
    }
}

run().catch(e => core.setFailed(String(e)));
