"use client";

import BookCard from "@/components/BookCard";
import BookForm from "@/components/BookForm";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Book } from "@/types/book";
import { MoonIcon, SunIcon } from "lucide-react";
import { useMemo, useState } from "react";
import data from "../../public/data.json";
import { ThemeProvider, useDarkModeSwitch } from "./Theme";

export default function Page() {
  const [books, setBooks] = useState<Book[]>(data as Book[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);
  const { isDarkMode, toggleDarkMode } = useDarkModeSwitch();

  const handleAddBook = (newBook: Partial<Book>) => {
    const book: Book = {
      ...(newBook as Book),
      id: Math.max(...books.map((b) => b.id)) + 1,
    };
    setBooks([...books, book]);
    setIsModalOpen(false);
  };

  const handleUpdateBook = (updatedBook: Partial<Book>) => {
    setBooks(
      books.map((book) =>
        book.id === selectedBook?.id ? { ...book, ...updatedBook } : book
      )
    );
    setIsModalOpen(false);
    setSelectedBook(undefined);
  };

  const handleDeleteBook = (id: number) => {
    if (confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const darkModeMessage = useMemo(() => {
    return isDarkMode ? "Dark Mode" : "Light Mode";
  }, [isDarkMode]);

  return (
    <ThemeProvider darkMode={isDarkMode}>
      <main className="bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold dark:text-white">Book Gallery</h1>
            <div className="inline-flex items-center gap-2">
              <Switch
                id="dark-mode-switch"
                className="bg-blue-500 dark:bg-red-500"
                onClick={() => toggleDarkMode()}
              />
              <Label htmlFor="dark-mode-switch">
                <span className="sr-only">Toggle switch</span>
                {isDarkMode ? (
                  <MoonIcon className="size-4 text-white" aria-hidden="true" />
                ) : (
                  <SunIcon className="size-4" aria-hidden="true" />
                )}
              </Label>
            </div>
            <Button
              className="bg-blue-500 dark:bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => {
                setSelectedBook(undefined);
                setIsModalOpen(true);
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

          <Modal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedBook(undefined);
            }}
            title={selectedBook ? "Edit Book" : "Add New Book"}
            confirmText={selectedBook ? "Update Book" : "Add Book"}
          >
            <BookForm
              book={selectedBook}
              onSubmit={selectedBook ? handleUpdateBook : handleAddBook}
              onCancel={() => {
                setIsModalOpen(false);
                setSelectedBook(undefined);
              }}
            />
          </Modal>
        </div>
      </main>
    </ThemeProvider>
  );
}
