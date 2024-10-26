
// *------------------------------
// *   create book   Logic
// *------------------------------

const {cloudinary} = require('../Cloudinary/cloudinary.JS')
const  Book = require('../model/bookModel')
const path = require('path');
const fs = require('fs');

const createBook = async (req, res) => {
  const { title, publishedYear, genre, summary, ISBN } = req.body;
  let uploadImage;
  try {
   
    const coverImageType = req.files.coverImage[0].mimetype.split('/').pop();
    const coverFilename = req.files.coverImage[0].filename;
    const coverFilePath = path.resolve(__dirname, '../../public/data/upload', coverFilename);

    uploadImage = await cloudinary.uploader.upload(coverFilePath, {
      public_id: coverFilename,
      folder: 'book_Covers',
      format: coverImageType,
    }).catch(error => {
      console.error('Cloudinary upload error for cover image:', error);
      throw new Error('Failed to upload cover image to Cloudinary');
    });

    const bookFileName = req.files.file[0].filename;
    const bookFilePath = path.resolve(__dirname, '../../public/data/upload', bookFileName);

  const   bookFileUpload = await cloudinary.uploader.upload(bookFilePath, {
      resource_type: 'raw',
      public_id: bookFileName,
      folder: 'book_pdfs',
      format: 'pdf',
    }).catch(error => {
      console.error('Cloudinary upload error for book file:', error);
      throw new Error('Failed to upload book file to Cloudinary');
    });
     
    
     const user_id = req.user._id;
    // Create the book in the database
    const newBook = await Book.create({
      title,
      genre,
      summary,
      ISBN,
      publishedYear,
      author: user_id, 
      coverImage: uploadImage.secure_url,
      file: bookFileUpload.secure_url,
    });

    try {
      await fs.promises.unlink(filepath);
      await fs.promises.unlink(bookFilePath);

      console.log("Files deleted successfully");
    } catch (error) {
      console.error("Error deleting files:", error);
    }
    

    res.status(201).json({ message: 'Book created successfully', book: newBook._id });

  } catch (error) {
    console.error('Error in createBook function:', error);
    res.status(500).json({ message: 'Failed to create book', error: error.message });
  }
};
const mongoose = require('mongoose');
const { Console } = require('console');

// *------------------------------
// *   UPDATEBOOK  book   Logic
// *------------------------------

const updateBook = async (req, res, next) => {
  const { title, publishedYear, genre, summary, ISBN } = req.body;
  const bookId = req.params.bookId;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: 'Invalid book ID' });
  }
  try {
    const book = await Book.findById(bookId); 
    console.log("Book found:", book);

    if (!book) {
      return res.status(404).json({ message: 'Book is not found' });
    }
    
  
    if (book.author.toString() !== req.user._id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    let completeCoverImage = "";
    if (req?.files?.coverImage) {
      const coverImageType = req.files.coverImage[0].mimetype.split('/').pop();
      const coverFilename = req.files.coverImage[0].filename;
      const coverFilePath = path.resolve(__dirname, '../../public/data/upload', coverFilename);

      const uploadImage = await cloudinary.uploader.upload(coverFilePath, {
        public_id: coverFilename,
        folder: 'book_Covers',
        format:'coverImageType'
      }).catch(error => {
        console.error('Cloudinary upload error for cover image:', error);
        throw new Error('Failed to upload cover image to Cloudinary');
      });
      completeCoverImage = uploadImage.secure_url;
      await fs.promises.unlink(coverFilePath);
    }

    let completeFileName = "";
    if (req?.files?.file) {
      const bookFileName = req.files.file[0].filename;
      const bookFilePath = path.resolve(__dirname, '../../public/data/upload', bookFileName);

      const bookFileUpload = await cloudinary.uploader.upload(bookFilePath, {
        resource_type: 'raw',
        public_id: bookFileName,
        folder: 'book_pdf',
        format: 'pdf',
      }).catch(error => {
        console.error('Cloudinary upload error for book file:', error);
        throw new Error('Failed to upload book file to Cloudinary');
      });
      completeFileName = bookFileUpload.secure_url;
      await fs.promises.unlink(bookFilePath);
    }

     updatedBook = await Book.findByIdAndUpdate(
      { _id: bookId },
      {
        title,
        genre,
        publishedYear,
        coverImage: completeCoverImage || book.coverImage,
        file: completeFileName || book.file,
        ISBN,
        summary,
      },
      { new: true },
    );

    res.json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

};
// *------------------------------
// *   All  book   Logic
// *------------------------------

const listBook = async(req,res,next)=>{
try {
  const listbook =await Book.find();
  res.json(listbook);
  
} catch (error) {
  next()
}
}


// *------------------------------
// *   GET SINGLE book   Logic
// *------------------------------

const singleBook = async (req, res, next) => {
  const bookId = req.params.bookId; 
  
  try {
    const book = await Book.findById(bookId); 
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
    next();
  }
};

// *------------------------------
// *   DELETE SINGLE  book   Logic
// *------------------------------

const deleteBook = async (req, res, next) => {
  const { bookId } = req.params;  
  try {
   
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: 'Invalid book ID format' });
    }
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    // const user_id = req.user._id;
    if (book.author.toString() !== req.user._id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const deletedBook = await Book.findByIdAndDelete(bookId);
    const coverImageParts = book.coverImage.split('/');
    const coverImagePublicId = `${coverImageParts.at(-2)}/${coverImageParts.at(-1)?.split('.').at(-2)}`;
    const bookFileParts = book.file.split('/');
    const bookFilePublicId = `${bookFileParts.at(-2)}/${bookFileParts.at(-1)}`;
    await cloudinary.uploader.destroy(coverImagePublicId);
    await cloudinary.uploader.destroy(bookFilePublicId, {
      resource_type: 'raw'
    });
    res.status(200).json({ message: 'Book deleted successfully', deletedBook });

  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
    naxt();
  }
};

module.exports = {createBook,updateBook,listBook,singleBook,deleteBook}