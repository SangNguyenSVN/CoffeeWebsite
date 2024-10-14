const express = require('express');
const Product = require('../../models/product'); // Import Product model
const Category = require("../../models/category")
const Size = require('../../models/size'); // Import Size model

const router = express.Router();



router.post('/add', async (req, res) => {
  const { name, price, description, category, sizes } = req.body; // Lấy dữ liệu từ request body

  try {
    // Kiểm tra xem category có tồn tại không
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: 'Category không hợp lệ' });
    }

    // Kiểm tra các size có tồn tại không
    const sizesExist = await Size.find({ _id: { $in: sizes } });
    if (sizesExist.length !== sizes.length) {
      return res.status(400).json({ message: 'Một hoặc nhiều kích thước không hợp lệ' });
    }

    const product = new Product({ name, price, description, category, sizes });
    await product.save();
    res.status(201).json({ message: 'Sản phẩm đã được tạo thành công', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi tạo sản phẩm', error: error.message });
  }
});

// Lấy tất cả sản phẩm
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm', error: err.message });
  }
});

// Lấy tất cả sản phẩm với khả năng sắp xếp theo giá
// Đường dẫn: GET http://localhost:3000/api/products/all?sort=asc
// Đường dẫn: GET http://localhost:3000/api/products/all?sort=desc


router.get('/all', async (req, res) => {
  try {
    const sortOrder = req.query.sort === 'desc' ? -1 : 1; // Mặc định sắp xếp tăng dần
    const products = await Product.find().populate('category sizes').sort({ price: sortOrder });

    if (!products.length) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm nào.' });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server.', error });
  }
});
// Lấy sản phẩm theo ID
router.get('/one/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy thông tin sản phẩm', error: err.message });
  }
});

// Cập nhật sản phẩm
router.put('/:id', async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi cập nhật sản phẩm', error: err.message });
  }
});

// Xóa sản phẩm
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    res.status(200).json({ message: 'Xóa sản phẩm thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa sản phẩm', error: err.message });
  }
});

// Lấy toàn bộ danh sách sản phẩm thuộc loại "xxx"
// Ví dụ: GET http://localhost:3000/api/products/category/xxx
router.get('/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category }); // Giả định model có trường category
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm theo loại', error: err.message });
  }
});

// Lấy danh sách sản phẩm có tên chứa chữ "xxx"
// Ví dụ: GET http://localhost:3000/api/products/name/xxx
router.get('/name/:name', async (req, res) => {
  try {
    const products = await Product.find({ name: { $regex: req.params.name, $options: 'i' } }); // Giả định model có trường name
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm theo tên', error: err.message });
  }
});

// Lấy sản phẩm theo ID category
// Đường dẫn: GET http://localhost:3000/api/products/category/:categoryId
router.get('/category/:categoryId', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryId }).populate('category sizes');
    if (!products.length) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm cho category này.' });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server.', error });
  }
});

// Lấy sản phẩm theo ID size
// Đường dẫn: GET http://localhost:3000/api/products/size/:sizeId
router.get('/size/:sizeId', async (req, res) => {
  try {
    const products = await Product.find({ sizes: req.params.sizeId }).populate('category sizes');
    if (!products.length) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm cho size này.' });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server.', error });
  }
});
// Lấy sản phẩm theo tên size
// Đường dẫn: GET http://localhost:3000/api/products/size/name/:sizeName
router.get('/size/name/:sizeName', async (req, res) => {
  try {
    // Tìm kiếm size theo tên
    const size = await Size.findOne({ name: req.params.sizeName });
    
    if (!size) {
      return res.status(404).json({ message: 'Không tìm thấy size với tên này.' });
    }

    // Lấy sản phẩm theo ID size
    const products = await Product.find({ sizes: size._id }).populate('category sizes');
    
    if (!products.length) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm cho size này.' });
    }
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server.', error });
  }
});

// Lấy sản phẩm theo tên loại
// Đường dẫn: GET http://localhost:3000/api/products/category/name/:categoryName
router.get('/category/name/:categoryName', async (req, res) => {
  try {
    // Tìm kiếm category theo tên
    const category = await Category.findOne({ name: req.params.categoryName });
    
    if (!category) {
      return res.status(404).json({ message: 'Không tìm thấy loại với tên này.' });
    }

    // Lấy sản phẩm theo ID loại
    const products = await Product.find({ category: category._id }).populate('category sizes');
    
    if (!products.length) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm cho loại này.' });
    }
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server.', error });
  }
});
module.exports = router;
