import { promises as fs } from 'fs';
import path from 'path'

const tree = {
    files: [],
    dirs: [],
}

function getPath() {
    const args = process.argv.slice(2);

    if (args.length !== 1) {
        throw Error('Error: script must called with one argument (path to folder)')
    }

    return args[0]
}

async function fillTree(itemPath) {
    const stat = await fs.lstat(itemPath);

    if (stat.isFile()) {
        tree.files.push(itemPath)
        return
    }

    tree.dirs.push(itemPath)

    const nestedItemNames = await fs.readdir(itemPath)

    // Асинхронное выполнение
    await Promise.all(nestedItemNames.map(async nestedItemName => {
        const nestedItemPath = path.join(itemPath, nestedItemName)
        await fillTree(nestedItemPath)
    }))

    // Синхронное выполнение
    // for (const nestedItemName of nestedItemNames) {
    //     const nestedItemPath = path.join(itemPath, nestedItemName)
    //     await fillTree(nestedItemPath)
    // }
}

try {
    const rootPath = getPath()
    await fillTree(rootPath)
    console.log(tree)

    process.exit(0)
} catch (e) {
    console.error(e.message)

    process.exit(1)
}