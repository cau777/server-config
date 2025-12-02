const domain = 'caua-rinaldi.dev'

const isReachable = async (host, path = '') => {
    try {
        const res = await fetch('http://' + host.replace(domain, 'localhost') + path, {
            headers: {
                'Host': host
            }
        })
        console.log(res)
        return res.ok
    } catch (e) {
        console.error(e)
        return false
    }
}

const assertReachable = async (host, path = '') => {
    if (await isReachable(host, path)) return
    throw new Error(`Expected ${host}${path} to be reachable`)
}

const assertUnreachable = async (host, path = '') => {
    if (await isReachable(host, path))
        throw new Error(`Expected ${host}${path} to be unreachable`)
}

const tests = async () => {
    await assertReachable('caua-rinaldi.dev')
    await assertReachable('notes.caua-rinaldi.dev')
    await assertReachable('notes.caua-rinaldi.dev', '/login')
    await assertReachable('sudoku.caua-rinaldi.dev')
    await assertReachable('regex.caua-rinaldi.dev')
    await assertUnreachable('nothing.caua-rinaldi.dev')
}

tests()
