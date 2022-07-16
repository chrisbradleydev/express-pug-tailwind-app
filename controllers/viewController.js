const catchAsyc = require('../utils/catchAsync')

const getIndex = catchAsyc(async (req, res, next) => {
  res.status(200).render('index', {
    title: 'Home',
  })
})

module.exports = {
  getIndex,
}
