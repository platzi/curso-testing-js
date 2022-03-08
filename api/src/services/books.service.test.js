const BooksService = require('./books.service');

describe('Test for BooksService', () => {
  let service;
  beforeEach(() => {
    service = new BooksService();
  });

  describe('test for getBooks', () => {
    test('should return a list book', async () => {
      // Arrange
      // Act
      const books = await service.getBooks({});
      console.log(books);
      // Assert
      expect(books.length).toEqual(2);
    });
  });
});
