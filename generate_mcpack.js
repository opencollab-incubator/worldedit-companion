const fs = require('fs')
const archiver = require('archiver')

const buildDir = './build'
const outPackFile = buildDir + '/WorldEditCompanion.mcpack'
const clientOutFile = buildDir + '/client.js'

const run = async () => {
    let output = fs.createWriteStream(outPackFile)
    let archive = archiver('zip', { zlib: { level: 9 } })

    output.on('close', () => console.log('Archive created! Size: ' + archive.pointer() + ' bytes'))
    output.on('end', () => console.log('Data has been drained'))

    archive.on('warning', err => {
        if (err.code === 'ENOENT') {
            console.log('An error occured', err)
        } else {
            throw err
        }
    })

    archive.on('error', err => {
        throw err
    })
    
    archive.pipe(output)

    archive.directory('pack/scripts', 'scripts')
    archive.append(fs.createReadStream('pack/manifest.json'), { name: 'manifest.json' })
    archive.append(fs.createReadStream(clientOutFile), { name: 'scripts/client/client.js' })

    archive.finalize()
}

run()