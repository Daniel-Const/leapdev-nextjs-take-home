"use client";

import { Book } from "@/types/book";
import { Label } from "@radix-ui/react-label";
import { FormEvent, useState } from "react";
import { InputField } from "./InputField";
import { StarRating } from "./StarRating";
import { Button } from "./ui/button";

interface BookFormProps {
  book?: Book;
  onCancel: () => void;
  onSubmit: (book: Partial<Book>) => void;
}

export default function BookForm({ book, onCancel, onSubmit }: BookFormProps) {
  const [formData, setFormData] = useState<Partial<Book>>(
    book ?? {
      title: "",
      author: "",
      price: 0,
      currency: "AUD",
      isbn: "",
      publicationDate: "",
      genres: [],
      publisher: "",
      description: "",
      coverImage: "",
      pages: 0,
      stock: 0,
      rating: 0,
    }
  );

  const updateForm = (key: keyof Book, value: string | number) => {
    setFormData((formData) => ({ ...formData, [key]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        id="title"
        label="Title"
        placeholder="Book title"
        value={formData.title}
        onChange={(e) => updateForm("title", e.target.value)}
        required
      />

      <InputField
        id="author"
        label="Author"
        placeholder="Author"
        value={formData.author}
        onChange={(e) => updateForm("author", e.target.value)}
        required
      />

      <div>
        <Label
          htmlFor="star-rating"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200 pb-2"
        >
          Rating
        </Label>
        <StarRating
          id="star-rating"
          rating={formData.rating ?? 1}
          onChange={(value) => updateForm("rating", value)}
          readonly={false}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputField
          id="price"
          label="Price"
          placeholder="Price"
          value={formData.price}
          type="number"
          step={0.01}
          onChange={(e) => {
            updateForm("price", parseFloat(e.target.value));
          }}
          required
        />

        <InputField
          id="currency"
          label="Currency"
          placeholder="Currency"
          value={formData.currency}
          onChange={(e) => updateForm("currency", e.target.value)}
          required
        />
      </div>

      <InputField
        id="isbn"
        label="ISBN"
        placeholder="ISBN"
        value={formData.isbn}
        onChange={(e) => updateForm("isbn", e.target.value)}
        required
      />

      <InputField
        id="coverImage"
        label="Cover Image URL"
        placeholder=" Image URL..."
        value={formData.coverImage}
        onChange={(e) => updateForm("coverImage", e.target.value)}
        required
      />

      <InputField
        id="description"
        label="Description"
        type="textarea"
        placeholder="Description for the book"
        value={formData.description}
        onChange={(e) => updateForm("description", e.target.value)}
        required
      />

      <div className="flex justify-end gap-4 pt-4">
        <Button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-400"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          {book ? "Update Book" : "Add Book"}
        </Button>
      </div>
    </form>
  );
}
