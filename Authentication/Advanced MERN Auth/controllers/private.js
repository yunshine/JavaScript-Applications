exports.getPrivateData = (req, res, next) => {
    res.status(200).json({
        success: true,
        data: "Success! You've got access to the private data in this route!"
    });
};