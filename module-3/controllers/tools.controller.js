module.exports.getAllTools = (req, res) => {
    // const { ip, query, params, body, headers } = req;
    // console.log(ip, query, params, body, headers);
    // res.redirect("/login");
    // res.download(__dirname + "/tools.controller.js");
    // res.render("index.ejs", { id: 100 });
    res.status(200).json({ success: true, messages: "Success", data: "this is a get page" });
    res.status(401).json({ success: false, error: "unAuthorized access" });


};

module.exports.savePost = (req, res) => {
    res.status(200).json({ success: true, messages: "Success", data: "this is a post page" });
    res.status(401).json({ success: false, error: "unAuthorized access" });

};