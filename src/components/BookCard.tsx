import Image from "next/image";
import { Book } from "@/types/book";
import { Star } from "lucide-react";
import { StarRating } from "./StarRating";
import { Button } from "./ui/button";

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
}

export default function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  return (
    <div className="relative bg-white dark:bg-slate-600 rounded-lg shadow-md overflow-hidden">
      <div className="relative h-[300px] w-full">
        <Image
          src={book.coverImage}
          alt={`Cover of ${book.title}`}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="p-4 bg-white dark:bg-slate-600">
        <h3 className="text-lg font-semibold dark:text-white">{book.title}</h3>
        <div className="text-lg font-semibold dark:text-white">
          <StarRating
            id="star-rating"
            rating={book.rating ?? 1}
            readonly={true}
            size="20px"
          />
        </div>

        <p className="text-gray-600 dark:text-white">{book.author}</p>
        <p className="text-green-600 font-semibold mb-2">
          {book.currency} {book.price.toFixed(2)}
        </p>
        <p className="text-gray-700 text-sm line-clamp-3 mb-4 dark:text-white">
          {book.description}
        </p>
        <div className="mt-4 flex gap-2">
          <Button
            onClick={() => onEdit(book)}
            className="bg-blue-500 dark:bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit
          </Button>

          <Button
            onClick={() => onDelete(book)}
            className="bg-red-500 dark:bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
