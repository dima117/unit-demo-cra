function sleep(milliseconds) {
    const date = Date.now()
    let currentDate = null
    do {
      currentDate = Date.now()
    } while (currentDate - date < milliseconds)
}

sleep(Number(process.env.ms))
module.exports.sleep = sleep