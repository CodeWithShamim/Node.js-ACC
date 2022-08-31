module.exports.getAllTools = (req, res) => {
    const { ip, query, params, body, headers } = req;
    console.log(ip, query, params, body, headers);
    // res.redirect("/login");
    // res.download(__dirname + "/tools.controller.js");
    res.send("this is a get page");

};

module.exports.savePost = (req, res) => {
    res.send("this is a post page");
};