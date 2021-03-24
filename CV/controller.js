
const cvController = {
    imageUpload: (req,res) => {
        console.log("Contrl");
        res.json({
            message: "success"
        })
    }
}

module.exports = cvController