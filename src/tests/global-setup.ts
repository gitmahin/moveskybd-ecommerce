import { pgDb } from '@/lib'
import { reset } from 'drizzle-seed'
import type { TestProject } from 'vitest/node'
import * as schema from "@/database"
import chalk from 'chalk';

export default async function setup(project: TestProject) {
    console.log(chalk.yellow("Clearing Database..."))
    await reset(pgDb, schema)
    console.log(chalk.green.bold("Database cleared."))

    project.onTestsRerun( async () => {
        console.log(chalk.white.bgYellow.bold("Restart") + " " + chalk.yellow("Clearing Database for re-running the tests..."))
        await reset(pgDb, schema)
        console.log(chalk.green.bold("Database cleared."))
    })

    return async function teardown() {
        console.log(chalk.red.bold("Quiting tests... & Clearing Database..."))
        await reset(pgDb, schema)
        console.log(chalk.green("Database cleared! Exiting tests..."))
    }
}