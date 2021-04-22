import app from './app';

async function init() {
    await app.listen(app.get('PORT'), (req, res) => {
        console.log(`Server on Port ${app.get('PORT')}`)
    })
}

init();