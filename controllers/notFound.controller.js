class NotFoundController {
    renderNotFound(req, res) {
        res.render('notFound');
    }
}

module.exports = new NotFoundController();