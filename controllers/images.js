module.exports = {
    saveImage
};

function saveImage(req, res) {
    console.log(req.file)
    const location = "images/" + req.file.filename;
    return res.status(200).json( location );
}