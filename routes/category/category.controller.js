const asyncHandler = require('express-async-handler');
const Category = require('../../models/category.model');


//@desc get di tutte le categorie
//@route GET /api/category/
//@access private
const getAllCategory = asyncHandler(async (req, res) => {
    const result = await Category.selectAllCategory({ flagGenitore: req.user.genitore });
    res.status(200).send(result);
});

module.exports = { getAllCategory }