exports.handler = async function(event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify({
            name: 'Sungbin',
            age: 26,
            email: 'yangseongbin3763@gmail.com'
        })
    }
}