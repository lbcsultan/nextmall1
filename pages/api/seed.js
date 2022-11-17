import Product from '../../models/Product'
import User from '../../models/User'
import data from '../../utils/data'
import db from '../../utils/db'

const handler = async (req, res) => {
  await db.connect()
  await User.deleteMany()
  await User.insertMany(data.users)
  await Product.deleteMany()
  await Product.insertMany(data.products)
  await db.disconnect()
  res.send({
    message: 'seeded successfully. 초기 사용자를 성공적으로 등록했습니다.',
  })
}

export default handler
