"use client";

import BookCard from "@/components/BookCard";
import BookForm from "@/components/BookForm";
import Modal from "@/components/Modal";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { Button } from "@/components/ui/button";
import { Book } from "@/types/book";
import { useState } from "react";
import data from "../../public/data.json";
import { useDarkModeSwitch } from "./Theme";

export default function Page() {
  const [books, setBooks] = useState<Book[]>(data as Book[]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);
  const { isDarkMode, toggleDarkMode } = useDarkModeSwitch();

  const handleAddBook = (newBook: Partial<Book>) => {
    const book: Book = {
      ...(newBook as Book),
      id: Math.max(...books.map((b) => b.id)) + 1,
    };
    setBooks([...books, book]);
    setIsFormModalOpen(false);
  };

  const handleUpdateBook = (updatedBook: Partial<Book>) => {
    setBooks(
      books.map((book) =>
        book.id === selectedBook?.id ? { ...book, ...updatedBook } : book
      )
    );
    setIsFormModalOpen(false);
    setSelectedBook(undefined);
  };

  const handleDeleteBook = (book: Book) => {
    setSelectedBook(book);
    setIsDeleteModalOpen(true);
  };

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setIsFormModalOpen(true);
  };

  return (
    <main className="bg-white dark:bg-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold dark:text-white">Book Gallery</h1>
          <ThemeSwitch isDarkMode={isDarkMode} toggle={toggleDarkMode} />
          <Button
            className="bg-blue-500 dark:bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => {
              setSelectedBook(undefined);
              setIsFormModalOpen(true);
            }}
          >
            Add New Book
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={handleEdit}
              onDelete={handleDeleteBook}
            />
          ))}
        </div>

        {/* Form modal for editing / adding a book */}
        <Modal
          isOpen={isFormModalOpen}
          onClose={() => {
            setIsFormModalOpen(false);
            setSelectedBook(undefined);
          }}
          title={selectedBook ? "Edit Book" : "Add New Book"}
          content={
            <BookForm
              book={selectedBook}
              onSubmit={selectedBook ? handleUpdateBook : handleAddBook}
              onCancel={() => {
                setIsFormModalOpen(false);
                setSelectedBook(undefined);
              }}
            />
          }
        />

        {/* Confirmation modal for deleting a book */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedBook(undefined);
          }}
          content={
            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                onClick={() => {
                  setSelectedBook(undefined);
                  setIsDeleteModalOpen(false);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setBooks(
                    books.filter((book) => book.id !== selectedBook?.id)
                  );
                  setIsDeleteModalOpen(false);
                  setSelectedBook(undefined);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-700"
              >
                Delete Book
              </Button>
            </div>
          }
          title={`Deleting "${selectedBook?.title}"`}
          description="Are you sure you want to remove this book?"
        ></Modal>
      </div>
    </main>
  );
}
